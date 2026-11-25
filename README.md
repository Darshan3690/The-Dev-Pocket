# VibeCI ⚡

<div align="center">

[![npm version](https://img.shields.io/npm/v/vibeci.svg?style=flat-square&color=6366F1)](https://www.npmjs.com/package/vibeci)
[![npm downloads](https://img.shields.io/npm/dm/vibeci.svg?style=flat-square&color=10B981)](https://www.npmjs.com/package/vibeci)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Darshan3690/The-Dev-Pocket?style=flat-square&color=F59E0B)](https://github.com/Darshan3690/The-Dev-Pocket/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

**The CI seatbelt for vibe coding and AI coding agents.**

*Catch Windows-to-Linux casing traps, runtime drift, unverified toolchain gaps, and lazy AI test-cheats locally in seconds—before your pull request breaks GitHub Actions.*

[**Live Demo**](https://the-dev-pocket.vercel.app) • [**npm Package**](https://www.npmjs.com/package/vibeci) • [**Report Bug**](https://github.com/Darshan3690/The-Dev-Pocket/issues) • [**Contributing**](CONTRIBUTING.md)

---

</div>

## 🚀 Published on npm Registry

`vibeci` is officially published on npm!

- **Package URL:** [npmjs.com/package/vibeci](https://www.npmjs.com/package/vibeci)
- **Version:** `0.1.2`

Any developer worldwide can run it immediately without installation:

```bash
# Preflight checks (casing & CI gap analysis)
npx vibeci preflight

# Anti-cheat diff verify (local working tree or PR diff)
npx vibeci verify
npx vibeci verify --base origin/main

# Change-aware checks (supports Node, Python, Rust, CMake)
npx vibeci check
npx vibeci check --base origin/main --allow-build

# Validate PR template & metadata guardrail before git push
npx vibeci check --pr-template
npx vibeci check --pr-metadata
```

Or install globally:

```bash
npm install -g vibeci
```

---

## ⚡ Why VibeCI?

When vibe coding with AI coding agents (Cursor, Claude Code, Antigravity IDE, Cline, Windsurf), tasks move 10x faster. But local success often leads to broken cloud CI pipelines:

1. **Silent Casing Traps:** Code passes on Windows NTFS and macOS APFS, but crashes immediately on Ubuntu GitHub Actions runners due to case sensitivity.
2. **AI Test Cheating:** AI agents frequently bypass type errors (`// @ts-ignore`, `eslint-disable`) or comment out assertions in test files to fake a passing build.
3. **Environment Drift & Unverified Gaps:** Mismatches between your local machine (e.g. Windows without clang-format/pytest) and cloud CI. VibeCI detects missing toolchains, provides containerized fallbacks (`docker` / `act`), and penalizes readiness scores accurately.
4. **Automated PR Template & Metadata Guardrail:** Verifies local commits and PR descriptions against `.github/PULL_REQUEST_TEMPLATE.md` to prevent pushing PRs with uncompleted checklists or missing risk assessments.
5. **Robust Remote PR Forensics:** Analyzes remote PR checks with auto remote repo detection (`-R <owner>/<repo>`) and REST API fallback with `GITHUB_TOKEN`.

---

## 🛠️ Commands Reference

| Command | Action |
|---|---|
| `vibeci analyze` | Scan repository, build `.vibeci/ci-twin.json`, and detect local-to-CI environment gaps. |
| `vibeci verify [options]` | Run Anti-Cheat Git Diff Audit to verify AI agent repairs or PR diffs. |
| `vibeci preflight [options]` | Run preflight checks: CI twin analysis + cross-platform casing guard. |
| `vibeci check [options]` | Execute change-aware checks with safety guards and optional `--pr-template`. |
| `vibeci explain` | Classify failures and show readiness score from latest check report. |
| `vibeci repair [options]` | Run evidence-driven repair loop for failed checks. |
| `vibeci analyze-pr <pr-number>` | Analyze remote PR failures and generate verification badge with auto-remote targeting. |
| `vibeci init [options]` | Initialize VibeCI guardrails in repository (config and git hooks). |
| `vibeci mcp` | Start VibeCI JSON-RPC 2.0 MCP server for IDE agent integration. |

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

---

## 📄 License

MIT © [Darshan Rajput](https://github.com/Darshan3690)
