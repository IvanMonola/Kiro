# 🛡️ AI Content Moderation Pipeline

An event-driven content moderation system built with AWS Bedrock and Lambda, developed entirely using Kiro's **spec-driven development** workflow.

## Architecture

```
User Upload → S3 Bucket → Lambda Trigger → Bedrock (Claude) → DynamoDB
                                              ↓
                                     SNS Notification
                                     (flagged content)
```

## Kiro Features Demonstrated

### 1. Feature Spec — AI Content Moderation
Full three-phase workflow:
- `requirements.md` — User stories for content upload, moderation, and admin review
- `design.md` — Sequence diagrams, Bedrock integration architecture, error handling
- `tasks.md` — 12 discrete tasks with dependency-based parallel execution

### 2. Steering Files
- `product.md` — Product overview for the moderation platform
- `tech.md` — AWS services stack (Lambda, Bedrock, DynamoDB, S3, SNS)
- `structure.md` — Project file organization and naming conventions
- `aws-bedrock-patterns.md` — Bedrock-specific prompt engineering and retry patterns

### 3. Hooks
- **Security Scanner** (Agent Stop) — Scans for exposed API keys or ARNs before commit
- **Test Generator** (File Save on `src/**/*.ts`) — Auto-generates unit tests on save
- **Bedrock Prompt Validator** (File Save on `src/prompts/**`) — Validates prompt templates

### 4. MCP Integration
- Figma MCP for admin dashboard design validation
- AWS MCP for CloudFormation template assistance

## Quick Start

```bash
npm install
npm run build
npm run deploy  # Deploys via AWS CDK
```

## Project Structure

```
├── .kiro/
│   ├── specs/
│   │   └── ai-content-moderation/
│   │       ├── requirements.md
│   │       ├── design.md
│   │       └── tasks.md
│   ├── steering/
│   │   ├── product.md
│   │   ├── tech.md
│   │   ├── structure.md
│   │   └── aws-bedrock-patterns.md
│   └── hooks/
│       ├── security-scanner.kiro.hook
│       ├── test-generator.kiro.hook
│       └── prompt-validator.kiro.hook
├── src/
│   ├── handlers/
│   │   ├── upload.ts
│   │   ├── moderate.ts
│   │   └── review.ts
│   ├── utils/
│   │   ├── bedrock-client.ts
│   │   └── prompt-builder.ts
│   └── models/
│       └── content.ts
├── tests/
├── docs/
├── package.json
└── tsconfig.json
```

## License

MIT
