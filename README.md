# VibeCI ⚡

<div align="center">

[![npm version](https://img.shields.io/npm/v/vibeci.svg?style=flat-square&color=6366F1)](https://www.npmjs.com/package/vibeci)
[![npm downloads](https://img.shields.io/npm/dm/vibeci.svg?style=flat-square&color=10B981)](https://www.npmjs.com/package/vibeci)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Darshan3690/The-Dev-Pocket?style=flat-square&color=F59E0B)](https://github.com/Darshan3690/The-Dev-Pocket/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

**The CI seatbelt for vibe coding and AI coding agents.**

*Catch Windows-to-Linux casing traps, runtime drift, and lazy AI test-cheats locally in seconds—before your pull request breaks GitHub Actions.*

[**Live Demo**](https://the-dev-pocket.vercel.app) • [**npm Package**](https://www.npmjs.com/package/vibeci) • [**Report Bug**](https://github.com/Darshan3690/The-Dev-Pocket/issues) • [**Contributing**](CONTRIBUTING.md)

---

</div>

## 🚀 Published on npm Registry

`vibeci@0.1.0` is now officially published on npm!

- **Package URL:** [npmjs.com/package/vibeci](https://www.npmjs.com/package/vibeci)
- **Tag:** `latest -> 0.1.0`

Any developer worldwide can run it immediately without installation:

```bash
npx vibeci preflight
npx vibeci verify
```

Or install globally on your machine:

```bash
npm install -g vibeci
```

---

## ⚡ Why VibeCI?

When vibe coding with AI coding agents (Cursor, Claude Code, Antigravity IDE, Cline, Windsurf), tasks move 10x faster. But local success often leads to broken cloud CI pipelines:

1. **Silent Casing Traps:** Code passes on Windows NTFS and macOS APFS, but crashes immediately on Ubuntu GitHub Actions runners due to case sensitivity.
2. **AI Test Cheating:** AI agents frequently bypass type errors (`// @ts-ignore`, `eslint-disable`) or comment out assertions in test files to fake a passing build.
3. **Environment Drift:** Mismatches between your local machine (e.g. Node 22 on Windows) and CI targets (Node 20 on Ubuntu).
4. **Token-Wasting Log Dumps:** Agents waste hundreds of thousands of tokens analyzing 5,000-line cloud CI logs instead of focusing on clean, structured 5-line root causes.

**VibeCI gives you a deterministic CI Twin and Anti-Cheat Diff Auditor right on your laptop.**

---

## 🛠️ Quick Start

### 1. Zero-Config Init
Initialize local CI twin config and optional git pre-commit anti-cheat hook:
```bash
npx vibeci init --hook
```

### 2. Run Preflight Diagnostics
Detect OS drift, Node version drift, and relative import casing traps:
```bash
npx vibeci preflight
```

### 3. Run Change-Aware Checks
Run static gates and affected tests locally in under 1 second:
```bash
npx vibeci check --fast
```

### 4. Verify Diff Safety (Anti-Cheat Guard)
Programmatically inspect unstaged and staged git diffs to ensure no AI agent suppressed linters or weakened tests:
```bash
npx vibeci verify
```

---

## 🤖 AI Agent & MCP Integration

VibeCI includes a native Model Context Protocol (MCP) server so Cursor, Claude Code, and Antigravity can audit diffs and run diagnostics autonomously.

### Configure in Cursor (`.cursor/mcp.json`) or Claude Desktop:

```json
{
  "mcpServers": {
    "vibeci": {
      "command": "npx",
      "args": ["-y", "vibeci", "mcp"]
    }
  }
}
```

### Available MCP Tools for Agents:
- `vibeci_preflight` — Scan repository and check for environment drift and casing issues.
- `vibeci_audit_diff` — Inspect working tree changes to block cheating before commits.
- `vibeci_run_checks` — Run targeted local CI checks for modified files.

---

## 📋 CLI Command Reference

| Command | Description |
|---|---|
| `vibeci preflight` | Run CI twin analysis and cross-platform casing checks |
| `vibeci verify` | Run Anti-Cheat Git Diff Audit on staged and unstaged files |
| `vibeci analyze` | Parse `.github/workflows/*.yml` into `.vibeci/ci-twin.json` |
| `vibeci check [--fast] [--all]` | Execute safe change-aware check queue |
| `vibeci explain` | Classify recent failures and generate 5-line agent prompt |
| `vibeci repair` | Autonomous repair loop with safety verification |
| `vibeci mcp` | Start VibeCI JSON-RPC 2.0 MCP server |
| `vibeci analyze-pr <pr-number>` | Analyze remote PR failure logs and output markdown badge |

---

## 🔒 Git Pre-Commit Hook (Automated Seatbelt)

Block bad commits before they hit GitHub by adding VibeCI to your pre-commit hooks:

```bash
# In .git/hooks/pre-commit or Husky:
npx vibeci verify
```

If an agent or developer injects `// @ts-ignore` or introduces a case-sensitive file path mismatch, the commit is aborted instantly.

---

## 🤝 Contributing

Contributions are welcome! Please check out [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

1. Fork the repo: [https://github.com/Darshan3690/The-Dev-Pocket](https://github.com/Darshan3690/The-Dev-Pocket)
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Test locally with `npm run build` and `vibeci verify`
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

Built with ❤️ by [Darshan Rajput](https://github.com/Darshan3690).
