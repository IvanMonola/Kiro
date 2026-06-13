import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { z } from 'zod';

const client = new BedrockRuntimeClient({});
const MODEL_ID = process.env.BEDROCK_MODEL_ID!;
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

const ModerationResultSchema = z.object({
  riskScore: z.number().min(0).max(100),
  categories: z.array(z.string()),
  reasoning: z.string(),
  suggestedAction: z.enum(['APPROVE', 'REVIEW', 'FLAG']),
});

export type ModerationResult = z.infer<typeof ModerationResultSchema>;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function invokeModeration(
  systemPrompt: string,
  userContent: Array<{ type: string; [key: string]: unknown }>,
): Promise<ModerationResult> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await client.send(
        new InvokeModelCommand({
          modelId: MODEL_ID,
          contentType: 'application/json',
          accept: 'application/json',
          body: JSON.stringify({
            anthropic_version: 'bedrock-2023-05-31',
            max_tokens: 1024,
            temperature: 0.1,
            system: systemPrompt,
            messages: [{ role: 'user', content: userContent }],
          }),
        }),
      );

      const responseBody = JSON.parse(
        new TextDecoder().decode(response.body),
      );

      const textContent = responseBody.content?.[0]?.text ?? '';
      const parsed = JSON.parse(textContent);
      return ModerationResultSchema.parse(parsed);
    } catch (error) {
      lastError = error as Error;
      const isThrottled =
        (error as { name?: string }).name === 'ThrottlingException';
      const isTimeout =
        (error as { name?: string }).name === 'ModelTimeoutException';

      if (isThrottled || isTimeout) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt);
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }

  throw lastError ?? new Error('Max retries exceeded for Bedrock invocation');
}
