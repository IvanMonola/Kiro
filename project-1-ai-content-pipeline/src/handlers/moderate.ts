import { S3Event } from 'aws-lambda';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { invokeModeration } from '../utils/bedrock-client';
import {
  buildTextModerationPrompt,
  buildTextContent,
  buildImageContent,
  computeContentHash,
} from '../utils/prompt-builder';
import { updateModerationResult, getContentById, ContentStatus } from '../models/content';

const s3 = new S3Client({});
const sns = new SNSClient({});
const BUCKET_NAME = process.env.CONTENT_BUCKET_NAME!;
const FLAGGED_TOPIC_ARN = process.env.FLAGGED_TOPIC_ARN!;

function resolveStatus(riskScore: number): ContentStatus {
  if (riskScore < 30) return 'APPROVED';
  if (riskScore < 70) return 'NEEDS_HUMAN_REVIEW';
  return 'REQUIRES_REVIEW';
}

export async function handler(event: S3Event): Promise<void> {
  for (const record of event.Records) {
    const s3Key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));
    const contentId = s3Key.split('/')[1]?.split('.')[0];

    if (!contentId) {
      console.error(`Could not extract contentId from S3 key: ${s3Key}`);
      continue;
    }

    try {
      const existingRecord = await getContentById(contentId);
      if (!existingRecord) {
        console.error(`No DynamoDB record found for contentId: ${contentId}`);
        continue;
      }

      // Fetch content from S3
      const s3Response = await s3.send(
        new GetObjectCommand({ Bucket: BUCKET_NAME, Key: s3Key }),
      );
      const bodyBytes = await s3Response.Body!.transformToByteArray();

      // Build prompt based on content type
      const systemPrompt = buildTextModerationPrompt();
      let userContent;

      if (existingRecord.contentType === 'text') {
        const text = new TextDecoder().decode(bodyBytes);
        userContent = buildTextContent(text);
      } else {
        const base64 = Buffer.from(bodyBytes).toString('base64');
        const mediaType = s3Key.endsWith('.png') ? 'image/png' : 'image/jpeg';
        userContent = buildImageContent(base64, mediaType);
      }

      // Invoke Bedrock moderation
      const result = await invokeModeration(systemPrompt, userContent);
      const status = resolveStatus(result.riskScore);

      // Update DynamoDB
      await updateModerationResult(contentId, {
        status,
        riskScore: result.riskScore,
        categories: result.categories,
        reasoning: result.reasoning,
      });

      // Notify if flagged
      if (status === 'REQUIRES_REVIEW' || status === 'NEEDS_HUMAN_REVIEW') {
        await sns.send(
          new PublishCommand({
            TopicArn: FLAGGED_TOPIC_ARN,
            Subject: `Content Flagged: ${contentId}`,
            Message: JSON.stringify({
              contentId,
              status,
              riskScore: result.riskScore,
              categories: result.categories,
              reasoning: result.reasoning,
            }),
          }),
        );
      }

      console.info(
        `Moderation complete: ${contentId} → ${status} (score: ${result.riskScore})`,
      );
    } catch (error) {
      console.error(`Moderation failed for ${contentId}:`, error);

      // Fail-safe: mark as REQUIRES_REVIEW so humans catch it
      await updateModerationResult(contentId, {
        status: 'REQUIRES_REVIEW',
        riskScore: -1,
        categories: ['moderation_error'],
        reasoning: `Automated moderation failed: ${(error as Error).message}`,
      });
    }
  }
}
