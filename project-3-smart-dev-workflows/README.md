# ⚡ Smart Developer Workflows for Kiro

A curated, production-ready collection of **Kiro Hooks** and **Steering files** that any development team can drop into their projects. Covers code quality, security, documentation, CI/CD, and team conventions.

> Think of this as a "starter kit" for teams adopting Kiro — copy the `.kiro/` folder and customize.

## What's Included

### 🔁 Hooks (10 ready-to-use)

| Hook | Trigger | Purpose |
|------|---------|---------|
| `security-audit` | Agent Stop | Scan for secrets, credentials, and vulnerabilities |
| `test-on-save` | File Save (`*.ts`) | Generate/update tests when source changes |
| `doc-sync` | File Save (`*.ts`) | Keep JSDoc and README in sync with code |
| `i18n-checker` | File Save (`locales/en/**`) | Flag missing translations |
| `commit-message` | Manual Trigger | Generate conventional commit message |
| `pr-description` | Manual Trigger | Generate PR description from diff |
| `api-contract` | File Save (`**/*.openapi.yaml`) | Validate OpenAPI spec consistency |
| `dependency-check` | File Save (`package.json`) | Audit new dependencies for vulnerabilities |
| `figma-validator` | File Save (`*.css`, `*.html`) | Validate against Figma design system (MCP) |
| `ticket-updater` | Post Tool Use | Update Jira/Linear ticket on task completion (MCP) |

### 📐 Steering Files (8 templates)

| File | Inclusion | Purpose |
|------|-----------|---------|
| `product.md` | always | Product context template |
| `tech.md` | always | Tech stack definition |
| `structure.md` | always | Project structure conventions |
| `testing.md` | fileMatch (`*.test.*`) | Testing standards and patterns |
| `api-design.md` | auto | REST API conventions (loaded when relevant) |
| `debugging-guide.md` | manual | Troubleshooting playbook (use with `#debugging-guide`) |
| `migration-playbook.md` | manual | Database migration procedures |
| `performance.md` | auto | Performance optimization patterns |

### 📄 AGENTS.md Template
Cross-compatible with other AI coding tools.

## Quick Start

```bash
# Copy into your existing project
cp -r .kiro/ /path/to/your-project/
cp AGENTS.md /path/to/your-project/

# Customize steering files for your project
# Open in Kiro IDE — hooks activate automatically
```

## Customization Guide

Each file includes comments explaining what to customize. The general approach:

1. **Steering files**: Update `product.md`, `tech.md`, and `structure.md` with your project details
2. **Hooks**: Enable/disable hooks by toggling them in the Kiro panel
3. **MCP hooks**: Configure your MCP servers (Figma, Jira, etc.) before using MCP-dependent hooks

## License

MIT — Use freely in personal and commercial projects.
