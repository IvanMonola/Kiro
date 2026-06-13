import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  QueryCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.CONTENT_TABLE_NAME!;

export type ContentStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'NEEDS_HUMAN_REVIEW'
  | 'REQUIRES_REVIEW'
  | 'REJECTED';

export interface ContentRecord {
  contentId: string;
  userId: string;
  contentType: 'text' | 'image';
  s3Key: string;
  status: ContentStatus;
  riskScore?: number;
  categories?: string[];
  reasoning?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  ttl: number;
}

export async function createContent(
  record: ContentRecord,
): Promise<void> {
  const ninetyDaysFromNow = Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60;

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `CONTENT#${record.contentId}`,
        SK: 'META',
        ...record,
        ttl: ninetyDaysFromNow,
      },
    }),
  );
}

export async function updateModerationResult(
  contentId: string,
  result: {
    status: ContentStatus;
    riskScore: number;
    categories: string[];
    reasoning: string;
  },
): Promise<void> {
  await docClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: `CONTENT#${contentId}`, SK: 'META' },
      UpdateExpression:
        'SET #status = :status, riskScore = :score, categories = :cats, reasoning = :reason',
      ExpressionAttributeNames: { '#status': 'status' },
      ExpressionAttributeValues: {
        ':status': result.status,
        ':score': result.riskScore,
        ':cats': result.categories,
        ':reason': result.reasoning,
      },
    }),
  );
}

export async function getContentById(
  contentId: string,
): Promise<ContentRecord | null> {
  const response = await docClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: `CONTENT#${contentId}`, SK: 'META' },
    }),
  );
  return (response.Item as ContentRecord) ?? null;
}

export async function getReviewQueue(
  status: ContentStatus,
  limit = 25,
): Promise<ContentRecord[]> {
  const response = await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'StatusIndex',
      KeyConditionExpression: '#status = :status',
      ExpressionAttributeNames: { '#status': 'status' },
      ExpressionAttributeValues: { ':status': status },
      ScanIndexForward: false,
      Limit: limit,
    }),
  );
  return (response.Items as ContentRecord[]) ?? [];
}
