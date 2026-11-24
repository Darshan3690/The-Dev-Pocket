import { simpleGit } from "simple-git";

export interface SafetyAuditResult {
  passed: boolean;
  violations: string[];
}

const PROHIBITED_SUPPRESSIONS = [
  { pattern: /@ts-ignore/, label: "@ts-ignore type suppression" },
  { pattern: /@ts-expect-error/, label: "@ts-expect-error suppression" },
  { pattern: /eslint-disable/, label: "eslint-disable directive" },
  { pattern: /#\s*noqa/i, label: "Python # noqa linter suppression" },
  { pattern: /#\s*type:\s*ignore/i, label: "Python # type: ignore suppression" },
  { pattern: /\b(it|test|describe)\.skip\s*\(/, label: "Skipped test (.skip)" },
  { pattern: /@pytest\.mark\.skip/, label: "Skipped pytest (@pytest.mark.skip)" },
];

export async function auditRepairDiff(repoRoot: string): Promise<SafetyAuditResult> {
  const git = simpleGit(repoRoot);
  const unstagedDiff = await git.diff();
  const stagedDiff = await git.diff(["--cached"]);
  const rawDiff = `${unstagedDiff}\n${stagedDiff}`;
  const violations: string[] = [];

  if (!rawDiff.trim()) {
    return { passed: true, violations: [] };
  }

  let currentFile = "";
  let removedAssertions = 0;
  let addedAssertions = 0;

  for (const line of rawDiff.split("\n")) {
    if (line.startsWith("+++ b/")) {
      currentFile = line.slice(6).trim();
      if (currentFile.startsWith(".github/workflows/")) {
        violations.push(`CRITICAL: Prohibited modification to CI workflow file '${currentFile}'.`);
      }
      continue;
    }

    if (line.startsWith("+") && !line.startsWith("+++")) {
      for (const rule of PROHIBITED_SUPPRESSIONS) {
        if (rule.pattern.test(line)) {
          violations.push(`CHEAT DETECTED in ${currentFile}: Added ${rule.label} -> "${line.slice(1).trim()}"`);
        }
      }
      if (/\b(expect|assert)\s*\(/.test(line)) addedAssertions++;
    }

    if (line.startsWith("-") && !line.startsWith("---")) {
      if (/\b(expect|assert)\s*\(/.test(line)) removedAssertions++;
    }
  }

  // Only trigger test weakening if significant assertions removed without tests passing
  if (removedAssertions > 0 && addedAssertions === 0 && removedAssertions > 2) {
    violations.push(
      `TEST WEAKENING DETECTED: Removed ${removedAssertions} test assertion(s) with 0 added replacement assertions.`
    );
  }

  return {
    passed: violations.length === 0,
    violations,
  };
}