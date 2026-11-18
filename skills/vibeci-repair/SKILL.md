# VibeCI Repair Skill

This skill enables IDE coding agents (Cursor, Claude Code, Antigravity) to interact with VibeCI for CI verification and repair.

## Available Tools

### get_ci_twin
Returns the CI Twin environment analysis including OS/runtime gaps, casing issues, and readiness score.

**Input:** None  
**Output:** JSON with `.vibeci/ci-twin.json` contents

### run_preflight
Runs preflight checks to detect CI environment gaps before code is pushed.

**Input:** None  
**Output:** JSON with gap count, critical issues, readiness score, and blocked status

### verify_repair
Runs anti-cheat diff safety audit on the current git diff to verify AI agent repairs haven't deleted tests or added suppressions.

**Input:** None  
**Output:** JSON with passed boolean and violations array

## Usage Example

```json
{
  "tool": "get_ci_twin",
  "arguments": {}
}
```

## Integration

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "vibeci": {
      "command": "npx",
      "args": ["tsx", "/path/to/VibeCI/src/mcp/server.ts"]
    }
  }
}
```