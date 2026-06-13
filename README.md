 🚀 Kiro IDE — Professional Project Showcase

> A collection of production-grade projects built with [Kiro](https://kiro.dev), the agentic IDE by AWS. Each project demonstrates real-world usage of **Specs**, **Hooks**, **Steering**, and **MCP Servers**.

## Projects

| # | Project | Kiro Features | Stack |
|---|---------|---------------|-------|
| 1 | [AI Content Moderation Pipeline](./project-1-ai-content-pipeline/) | Specs (Feature + Bugfix), Steering, Hooks, MCP | TypeScript, AWS Lambda, Bedrock, DynamoDB |
| 2 | [Serverless Multi-Tenant SaaS API](./project-2-serverless-saas-api/) | Specs (Design-First + Quick Plan), Steering (conditional), Hooks | TypeScript, API Gateway, Cognito, Stripe |
| 3 | [Smart Developer Workflows](./project-3-smart-dev-workflows/) | Hooks (all trigger types), Steering (auto + manual), MCP | Shell, YAML, Markdown |

## Why These Projects?

Each project was designed to showcase **different depths** of Kiro's capabilities:

- **Project 1** shows the full spec-driven lifecycle — from requirements through design to parallel task execution — applied to an AI/ML use case with AWS Bedrock.
- **Project 2** demonstrates how Steering files and conditional inclusion keep a complex multi-team SaaS codebase consistent across billing, auth, and tenant isolation.
- **Project 3** is a reusable toolkit of hooks and steering files that any team can adopt to automate code quality, security scanning, documentation, and CI/CD integration.

## Kiro Feature Coverage Matrix

```
Feature                    │ Project 1 │ Project 2 │ Project 3
───────────────────────────┼───────────┼───────────┼──────────
Feature Specs              │     ✅    │     ✅    │     —
Bugfix Specs               │     ✅    │     —     │     —
Quick Plan                 │     —     │     ✅    │     —
Parallel Task Execution    │     ✅    │     ✅    │     —
Steering (always)          │     ✅    │     ✅    │     ✅
Steering (fileMatch)       │     —     │     ✅    │     ✅
Steering (auto)            │     —     │     —     │     ✅
Steering (manual)          │     —     │     —     │     ✅
Hooks (File Save)          │     ✅    │     ✅    │     ✅
Hooks (Agent Stop)         │     ✅    │     —     │     ✅
Hooks (Manual Trigger)     │     —     │     —     │     ✅
Hooks (Pre/Post Tool Use)  │     —     │     —     │     ✅
Hooks + MCP Integration    │     ✅    │     —     │     ✅
AGENTS.md                  │     —     │     ✅    │     ✅
```

## Getting Started

1. Install [Kiro IDE](https://kiro.dev/downloads/)
2. Clone this repository
3. Open any project folder in Kiro
4. Kiro will auto-detect `.kiro/` configurations

## Author

Built as part of my [Kiro Ambassador](https://kiro.dev/ambassadors/) application — demonstrating real-world, production-grade usage of Kiro's agentic development capabilities.

## License

MIT
