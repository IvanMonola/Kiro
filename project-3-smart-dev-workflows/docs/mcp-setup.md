# MCP Server Setup Guide

Some hooks in this collection require MCP (Model Context Protocol) servers. Here's how to configure them.

## Figma MCP (for `figma-validator` hook)

1. In Kiro, open Settings → MCP Servers
2. Add a new server:
   - Name: `figma`
   - URL: Your Figma MCP server URL
3. Configure your Figma file key as an environment variable
4. The hook will automatically use the Figma MCP when validating CSS/HTML files

## Jira/Linear MCP (for `ticket-updater` hook)

1. In Kiro, open Settings → MCP Servers
2. Add your project management MCP server
3. Map spec tasks to tickets by adding `[TICKET-123]` prefix to task titles in tasks.md
4. The hook will update ticket status when spec tasks are completed

## Troubleshooting

- **Hook not firing**: Check that the MCP server is connected (green indicator in Kiro panel)
- **Auth errors**: Verify your MCP server credentials are current
- **Slow responses**: MCP calls add latency; consider using auto-approval for trusted tools
