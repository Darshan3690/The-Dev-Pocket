import fs from "node:fs";
import path from "node:path";

export interface BadgeData {
  readinessScore: number;
  ciTwinParity: boolean;
  executedChecks: Array<{ id: string; durationMs: number; passed: boolean }>;
  safetyAudit: { passed: boolean; violations: number };
}

export function generatePrBadge(data: BadgeData): string {
  const status =
    data.readinessScore >= 80 ? "✅ PASS" : data.readinessScore >= 60 ? "⚠️ WARN" : "❌ FAIL";
  const checksHtml = data.executedChecks
    .map(
      (c) => `| ${c.id} | ${c.durationMs}ms | ${c.passed ? "✅" : "❌"} |`
    )
    .join("\n");

  return `<details>
<summary>VibeCI Verification — ${status}</summary>

| Metric | Value |
|--------|-------|
| Readiness Score | ${data.readinessScore}/100 |
| CI Twin Parity | ${data.ciTwinParity ? "✅" : "❌"} |
| Safety Audit | ${data.safetyAudit.passed ? "✅ PASSED" : "❌ REJECTED"} |
| Suppressed Rules | ${data.safetyAudit.violations} |

### Executed Checks

| Check | Duration | Status |
|-------|----------|--------|
${checksHtml}

</details>`;
}

export function copyToClipboard(text: string): void {
  const reportDir = path.join(process.cwd(), ".vibeci", "reports");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, "pr-badge.md"), text, "utf8");
  console.log("PR badge saved to .vibeci/reports/pr-badge.md");
}