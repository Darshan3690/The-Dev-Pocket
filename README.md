# VibeCI ⚡

<div align="center">

[![npm version](https://img.shields.io/npm/v/vibeci.svg?style=flat-square&color=6366F1)](https://www.npmjs.com/package/vibeci)
[![npm downloads](https://img.shields.io/npm/dm/vibeci.svg?style=flat-square&color=10B981)](https://www.npmjs.com/package/vibeci)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Darshan3690/The-Dev-Pocket?style=flat-square&color=F59E0B)](https://github.com/Darshan3690/The-Dev-Pocket/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

**The CI seatbelt for vibe coding and AI coding agents.**

*Catch Windows-to-Linux casing traps, runtime drift, missing local toolchains, and lazy AI test-cheats locally in seconds—before your pull request breaks GitHub Actions.*

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

# Change-aware checks (supports Node, Python, Rust, CMake, C/C++)
npx vibeci check
npx vibeci check --base origin/main --allow-build

# PR Template & Metadata Guardrail
npx vibeci check --pr-template
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
3. **Missing Toolchains:** When local machines lack `pytest`, `clang-format`, or `cmake`, standard checkers mark builds as 100% green instead of flagging unverified toolchain gaps.
4. **Remote Target Misalignment:** PR checks fail on forks without automatic `-R <owner>/<repo>` upstream targeting and REST API fallback.
5. **PR Template Non-Compliance:** PRs get rejected because template sections, risk levels, or checkboxes remain uncompleted.

**VibeCI gives you a deterministic CI Twin, Toolchain Detection, and Anti-Cheat Diff Auditor right on your laptop.**

---

## 🛠️ CLI Reference

### 1. Zero-Config Init
Initialize local CI twin config and optional git pre-commit anti-cheat hook:
```bash
npx vibeci init --hook
```

### 2. Preflight Diagnostics
Detect OS drift, Node version drift, and relative import casing traps:
```bash
npx vibeci preflight
```

### 3. Change-Aware Checks with Toolchain Gap Detection
Run static gates and affected tests locally, flagging unverified gaps and container fallbacks (`docker`/`act`):
```bash
npx vibeci check
npx vibeci check --fast
```

### 4. PR Template & Metadata Guardrail
Validate your commit message or PR description against `.github/PULL_REQUEST_TEMPLATE.md`:
```bash
npx vibeci check --pr-template
npx vibeci check --pr-metadata
```

### 5. Anti-Cheat Git Diff Audit
Programmatically inspect git diffs to ensure no AI agent suppressed linters, skipped tests, or weakened assertions:
```bash
npx vibeci verify
npx vibeci verify --base origin/main
```

### 6. Remote PR Forensics & Badge
Inspect remote PR check failures with automatic upstream targeting (`-R owner/repo`) and REST API fallback:
```bash
npx vibeci analyze-pr 123 --copy-pr-badge
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

Available MCP Tools:
- `get_ci_twin`: Get full environment disparity report.
- `run_preflight`: Run case-sensitivity and environment checks.
- `verify_repair`: Audit git diff for anti-cheat violations.

---

## 📜 License

MIT License © [Darshan Rajput](https://github.com/Darshan3690)
