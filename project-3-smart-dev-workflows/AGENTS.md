# AGENTS.md — Smart Developer Workflows

## About This Repository
This is a collection of reusable Kiro hooks and steering files for development teams. It serves as a starter kit that teams can copy into their own projects.

## Rules for AI Assistants

### When editing hook files (.kiro/hooks/*.md)
- Preserve YAML front matter format (title, description, event, filePattern)
- Keep instructions clear and actionable
- Include specific file paths and patterns
- Provide code examples in fix recommendations

### When editing steering files (.kiro/steering/*.md)
- Preserve YAML front matter (inclusion mode, name, description)
- Keep content focused on one domain per file
- Include both "do" and "don't" patterns
- Use code examples liberally

### General
- TypeScript strict mode, no `any`
- Use conventional commit messages
- Document all public exports with JSDoc
- Tests are mandatory for new functionality
