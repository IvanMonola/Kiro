# 🏢 Serverless Multi-Tenant SaaS API

A production-grade multi-tenant SaaS backend with authentication, billing integration (Stripe), and tenant isolation — developed using Kiro's **Design-First** and **Quick Plan** spec workflows.

## Architecture

```
Clients → API Gateway → Cognito Auth → Lambda Functions → DynamoDB
                                              ↓
                                    Stripe (billing)
                                    SES (notifications)
```

## Kiro Features Demonstrated

### 1. Three Separate Feature Specs

| Spec | Workflow | Purpose |
|------|----------|---------|
| `user-authentication/` | Design-First | Cognito + JWT auth with MFA support |
| `billing-integration/` | Quick Plan (auto-generated) | Stripe subscriptions + usage metering |
| `multi-tenancy/` | Requirements-First | Row-level tenant isolation in DynamoDB |

### 2. Conditional Steering (fileMatch)
- `api-standards.md` — Always included: REST conventions, error format, versioning
- `auth-patterns.md` — Only when editing `src/middleware/auth*` or `src/functions/auth*`
- `billing-patterns.md` — Only when editing `src/functions/billing*`
- `dynamo-tenancy.md` — Only when editing `src/models/*`

### 3. AGENTS.md
Root-level `AGENTS.md` for cross-tool compatibility with other AI coding assistants.

### 4. Hooks
- **Input Validator** (File Save on `src/functions/**`) — Ensures all endpoints use zod schemas
- **Tenant Leak Detector** (Agent Stop) — Scans for missing tenant context in DB queries

## Quick Start

```bash
npm install
npx cdk deploy --context stage=dev
```

## Project Structure

```
├── .kiro/
│   ├── specs/
│   │   ├── user-authentication/
│   │   │   ├── requirements.md
│   │   │   ├── design.md
│   │   │   └── tasks.md
│   │   ├── billing-integration/
│   │   │   ├── requirements.md
│   │   │   ├── design.md
│   │   │   └── tasks.md
│   │   └── multi-tenancy/
│   │       ├── requirements.md
│   │       ├── design.md
│   │       └── tasks.md
│   ├── steering/
│   │   ├── product.md
│   │   ├── tech.md
│   │   ├── structure.md
│   │   ├── api-standards.md
│   │   ├── auth-patterns.md
│   │   ├── billing-patterns.md
│   │   └── dynamo-tenancy.md
│   └── hooks/
│       ├── input-validator.md
│       └── tenant-leak-detector.md
├── AGENTS.md
├── src/
│   ├── functions/
│   ├── middleware/
│   ├── models/
│   └── utils/
├── infra/
├── tests/
└── package.json
```

## License

MIT
