# AGENTS.md — Multi-Tenant SaaS API

## Project Context
This is a serverless multi-tenant SaaS API built with TypeScript, AWS Lambda, DynamoDB, Cognito, and Stripe.

## Critical Rules

### Tenant Isolation (MANDATORY)
- Every DynamoDB operation MUST include `TENANT#<tenantId>` in the partition key
- tenantId comes from JWT claims ONLY, never from request body
- NEVER use DynamoDB `Scan` operations
- NEVER use `FilterExpression` as sole tenant isolation

### Authentication
- All endpoints except /auth/register and /auth/login require Bearer token
- JWT tokens are verified against Cognito JWKS
- Role-based access: admin, member, viewer

### API Standards
- All inputs validated with zod before processing
- Errors follow structured format: `{ error: { code, message, details } }`
- Never log PII, passwords, or payment data
- Never expose stack traces in error responses

### Code Style
- TypeScript strict mode, no `any` types
- AWS SDK v3 modular imports
- Named exports for handlers
- Environment variables for all configuration
