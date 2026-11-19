<div align="center">

# 🛡️ VibeCI

**The CI seatbelt for vibe coding and AI coding agents.**

*Catch environment gaps, cross-platform casing traps, and lazy AI test-cheating before your pull request hits GitHub Actions.*

<br/>

[![GitHub Repo stars](https://img.shields.io/github/stars/Darshan3690/The-Dev-Pocket?style=for-the-badge&color=gold)](https://github.com/Darshan3690/The-Dev-Pocket/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Darshan3690/The-Dev-Pocket?style=for-the-badge&color=blue)](https://github.com/Darshan3690/The-Dev-Pocket/network/members)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](tsconfig.json)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MCP Ready](https://img.shields.io/badge/MCP-Server%20Included-8A2BE2?style=for-the-badge)](#-mcp--ai-agent-integration)

<br/>

```ascii
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  🔍 Analyze CI Twin  →  ⚡ Preflight Checks  →  🛡️ Audit AI Repair  →  🚀 Ship Green PR  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

<br/>

⭐ **If you find VibeCI helpful, please consider starring the repository to support development!** ⭐

<br/>

[About VibeCI](#-about-vibeci) • [Website Page](index.html) • [The Problem](#-the-problem) • [Key Features](#-key-features) • [Quick Start](#-quick-start) • [CLI Reference](#-cli-reference) • [Anti-Cheat Guard](#-anti-cheat-git-diff-auditor) • [MCP for Agents](#-mcp--ai-agent-integration) • [Contributing Guide](#-contributing)

</div>

---

## 📖 About VibeCI

**VibeCI** is an open-source, local-first CI twin and guardrail engine designed for developers and AI coding agents (**Antigravity, Cursor, Claude Code, Cline, Windsurf**). 

As AI agents write and edit code at high velocities ("vibe coding"), they frequently introduce subtle regressions that pass on the author's local workstation (Windows / macOS) but break upon hitting Linux GitHub Actions. Worse, when tasked with "fixing tests", agents often cheat—silently deleting test assertions, disabling linter checks, or peppering `@ts-ignore` to artificially pass builds.

**VibeCI acts as an intelligent safety seatbelt.** It reads your GitHub Actions workflows, mirrors them locally into an environment model (CI Twin), executes only affected checks, audits diffs against anti-cheat rules, and exposes native Model Context Protocol (MCP) tools so agents can verify their own fixes safely.

---

## 🚨 The Problem

```text
Local Machine (Windows / macOS):          GitHub Actions (ubuntu-latest):
  ✓ Tests passed locally                     ❌ ERR_MODULE_NOT_FOUND (import casing)
  ✓ Build passed                             ❌ Typecheck failed (Node 20 vs 22)
  ✓ Agent said: "All fixed!"                 ❌ Agent added // @ts-ignore & deleted 2 assertions
```

Existing tools fall short for modern AI agent development:

* **Heavy container runners (`act`)** require multi-gigabyte Docker setups and frequently fail on complex composite actions.
* **Cloud CI auto-fixers** require admin repository permissions—impractical for contributors and forks.
* **Raw AI agents** guess which commands to run, consume thousands of tokens on raw build logs, and weaken test suites when struggling with fixes.

**VibeCI** runs locally in seconds with **zero Docker overhead** and **zero API keys required**.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **🪞 CI Twin Engine** | Statically parses `.github/workflows/*.{yml,yaml}` to map runners, Node/Python versions, and steps into `.vibeci/ci-twin.json`. |
| **🪟➡️🐧 Casing & Path Guard** | Checks `git diff` relative imports against exact disk filename casing—catching Windows/macOS case-insensitive traps (`./UserService` vs `userService.ts`) before code hits Linux CI. |
| **🎯 Change-Aware Check Runner** | Inspects modified files in `git diff` and queues only the relevant lint, typecheck, or test commands. |
| **🛡️ Command Risk Guard** | Classifies commands before running (`SAFE`, `MODERATE`, `BLOCKED`). Blocks destructive calls (`rm -rf /`, `curl | bash`, token exposure). |
| **🚫 Anti-Cheat Diff Auditor** | Scans unstaged and staged diffs to **block** deleted `expect()`/`assert` calls, `.skip()`, `@ts-ignore`, `eslint-disable`, `# noqa`, or edits to workflow files. |
| **🧬 Intelligent Failure Fingerprinting** | Deterministically categorizes build errors (`TYPESCRIPT_ERROR`, `ESLINT_ERROR`, `IMPORT_ERROR`, etc.) with file and line coordinates. |
| **🔌 Native MCP Server** | Ships with a stdio MCP server (`vibeci mcp`) enabling agents in Cursor, Claude Code, and Antigravity to run preflight and verify repairs natively. |

---

## ⚡ Quick Start

Run VibeCI inside your Git repository:

```bash
# 1. Analyze repository and build local CI Twin
node ./dist/index.js analyze

# 2. Run preflight environment & casing checks
node ./dist/index.js preflight

# 3. Run change-aware CI checks
node ./dist/index.js check --fast

# 4. Audit git diff against anti-cheat rules
node ./dist/index.js verify
```

### Example Preflight Report Output

```text
╭────────────────────────────────────────────────────────────╮
│           VIBECI — Preflight Report                        │
╰────────────────────────────────────────────────────────────╯
Repository:      The-Dev-Pocket (branch: main)
Local Env:       win32 (Windows) | Node 22.14.0 | npm
Remote CI:       .github/workflows/ci.yml (ubuntu-latest | Node 20.x, 22.x)

[1/2] CI Twin & Environment Gap Scan
  ⚠ [MEDIUM] OS_MISMATCH: win32 vs ubuntu-latest (case-sensitive ext4)
     ↳ VibeCI Case-Sensitivity Guard enabled for relative imports.

[2/2] PR Readiness Score: 90/100 (READY)
```

---

## 🛠️ CLI Reference

| Command | Flags | Description |
|---|---|---|
| `vibeci analyze` | | Scans repo, parses `.github/workflows/*.yml`, builds `.vibeci/ci-twin.json`. |
| `vibeci preflight` | `--strict`, `--copy-pr-badge` | Runs CI Twin gap analysis + cross-platform casing checks. |
| `vibeci check` | `--all`, `--fast`, `--allow-build` | Executes change-aware CI checks with safety policy protection. |
| `vibeci verify` | | Audits git diff against anti-cheat rules (blocking deleted assertions & suppressions). |
| `vibeci explain` | | Analyzes latest check failures, classifies root causes, and shows readiness score. |
| `vibeci repair` | `--failure-id <id>`, `--root-cause <msg>` | Orchestrates bounded repair verification using latest failure report. |
| `vibeci analyze-pr <pr>` | `--copy-pr-badge` | Fetches failure logs from remote GitHub PR via `gh` CLI. |
| `vibeci mcp` | | Starts stdio JSON-RPC 2.0 MCP server for AI coding agents. |

---

## 🚫 Anti-Cheat Git Diff Auditor

AI coding agents often take shortcuts to make red checks turn green. Every edit verified through `vibeci verify` is audited against strict safety rules:

### ❌ Prohibited in Repair Diffs (Auto-Rejected):
* **Assertion Removal**: Net decrease in `expect(...)` or `assert(...)` calls in test suites.
* **Test Skipping**: Adding `.skip(`, `xit(`, `@pytest.mark.skip`, or equivalent.
* **Compiler / Linter Silencing**: Adding `@ts-ignore`, `@ts-expect-error`, `eslint-disable`, `# noqa`, or `# type: ignore`.
* **CI Workflow Tampering**: Modifying `.github/workflows/*` without authorization.

### ✅ Allowed Repairs:
* Fixing application logic, type definitions, and incorrect import paths/casing.
* Updating broken test fixtures while preserving or adding assertions.
* Resolving dependency mismatches and platform-specific code.

---

## 🤖 MCP & AI Agent Integration

VibeCI includes native support for the **Model Context Protocol (MCP)**. Any MCP-compliant IDE or agent (**Cursor, Claude Code, Antigravity**) can query VibeCI directly.

### Add to Agent MCP Configuration (`mcp.json`):

```json
{
  "mcpServers": {
    "vibeci": {
      "command": "node",
      "args": ["<path-to-repo>/dist/index.js", "mcp"]
    }
  }
}
```

### Tools Exposed to Agents:
* `get_ci_twin`: Returns the local-to-CI environment comparison and detected gaps.
* `run_preflight`: Executes preflight checks and returns gap counts with readiness score.
* `verify_repair`: Audits the agent's current diff against anti-cheat rules.

---

## 🤝 Contributing

We welcome contributions from developers, learners, and open-source enthusiasts!

### 🍴 Step-by-Step Contribution Guide

#### 1. Fork & Clone Repository
```bash
# Fork on GitHub: https://github.com/Darshan3690/The-Dev-Pocket
git clone https://github.com/<your-username>/The-Dev-Pocket.git
cd The-Dev-Pocket
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Build & Typecheck
```bash
npm run typecheck
npm run build
```

#### 4. Test Changes Locally Like a Real User
Verify all core flows work as expected before submitting:
```bash
# Test preflight
node ./dist/index.js preflight

# Test change-aware checks
node ./dist/index.js check --fast

# Test anti-cheat audit
node ./dist/index.js verify

# Test CI twin generation
node ./dist/index.js analyze
```

#### 5. Commit Your Changes
Use conventional commit messages (`feat:`, `fix:`, `docs:`, `chore:`):
```bash
git checkout -b feat/your-feature-name
git add .
git commit -m "feat(core): add support for python pytest checks"
git push origin feat/your-feature-name
```

#### 6. Open a Pull Request
Head over to [https://github.com/Darshan3690/The-Dev-Pocket/pulls](https://github.com/Darshan3690/The-Dev-Pocket/pulls) and open your PR!

---

## 👥 Contributors

Thank you to everyone who has contributed to the project!

<div align="center">

<a href="https://github.com/Darshan3690/The-Dev-Pocket/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Darshan3690/The-Dev-Pocket" alt="Contributors" />
</a>

</div>

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
