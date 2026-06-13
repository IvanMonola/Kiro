import { createHash } from 'crypto';

const SYSTEM_PROMPT = `You are a content moderation classifier. Analyze the provided content for policy violations.

You MUST respond with ONLY a valid JSON object matching this exact schema:
{
  "riskScore": <number 0-100>,
  "categories": [<array of violation categories detected>],
  "reasoning": "<brief explanation of your assessment>",
  "suggestedAction": "<APPROVE | REVIEW | FLAG>"
}

Violation categories to check:
- hate_speech: Content promoting hatred against protected groups
- harassment: Targeted attacks, bullying, or intimidation
- explicit_content: Sexually explicit material
- violence: Graphic violence or threats
- misinformation: Demonstrably false claims presented as fact
- spam: Unsolicited commercial content or repetitive messages
- prohibited_symbols: Hate symbols, extremist imagery

Scoring guide:
- 0-29: No violations detected, safe content
- 30-69: Potential concerns, recommend human review
- 70-100: Clear violations detected, flag immediately

Do not include any text outside the JSON object.`;

export function buildTextModerationPrompt(): string {
  return SYSTEM_PROMPT;
}

export function buildTextContent(
  text: string,
): Array<{ type: string; text: string }> {
  return [
    {
      type: 'text',
      text: `Please moderate the following user-submitted content:\n\n${text}`,
    },
  ];
}

export function buildImageContent(
  base64Image: string,
  mediaType: string,
): Array<{ type: string; [key: string]: unknown }> {
  return [
    {
      type: 'image',
      source: {
        type: 'base64',
        media_type: mediaType,
        data: base64Image,
      },
    },
    {
      type: 'text',
      text: 'Please moderate this user-submitted image for policy violations.',
    },
  ];
}

export function computeContentHash(content: string | Buffer): string {
  return createHash('sha256').update(content).digest('hex');
}
