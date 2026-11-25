import { simpleGit } from "simple-git";

export interface SafetyAuditResult {
  passed: boolean;
  violations: string[];
}

export interface SafetyAuditOptions {
  baseBranch?: string;
  headBranch?: string;
}

// Benign import-level suppression patterns (e.g. mock fallbacks)
const BENIGN_NOQA_PATTERNS = [
  /#\s*noqa:\s*F401\b/i, // unused import (common in optional mock modules)
  /#\s*noqa:\s*E402\b/i, // module level import not at top of file
];

const PROHIBITED_SUPPRESSIONS = [
  { pattern: /@ts-ignore/, label: "@ts-ignore type suppression" },
  { pattern: /@ts-expect-error/, label: "@ts-expect-error suppression" },
  { pattern: /eslint-disable/, label: "eslint-disable directive" },
  { pattern: /#\s*noqa(?!\s*:\s*(?:F401|E402)\b)/i, label: "Python # noqa linter suppression" },
  { pattern: /#\s*type:\s*ignore/i, label: "Python # type: ignore suppression" },
  { pattern: /\b(it|test|describe)\.skip\s*\(/, label: "Skipped test (.skip)" },
  { pattern: /@pytest\.mark\.skip/, label: "Skipped pytest (@pytest.mark.skip)" },
];

export async function auditRepairDiff(
  repoRoot: string,
  options: SafetyAuditOptions = {}
): Promise<SafetyAuditResult> {
  const git = simpleGit(repoRoot);
  let rawDiff = "";

  if (options.baseBranch) {
    const head = options.headBranch || "HEAD";
    try {
      rawDiff = await git.diff([`${options.baseBranch}...${head}`]);
    } catch {
      rawDiff = await git.diff([`${options.baseBranch}..${head}`]);
    }
  } else {
    const unstagedDiff = await git.diff();
    const stagedDiff = await git.diff(["--cached"]);
    rawDiff = `${unstagedDiff}\n${stagedDiff}`;
  }

  const violations: string[] = [];

  if (!rawDiff.trim()) {
    return { passed: true, violations: [] };
  }

  let currentFile = "";
  let isDocOrNonCode = false;
  let removedAssertions = 0;
  let addedAssertions = 0;

  for (const line of rawDiff.split("\n")) {
    const diffHeaderMatch = line.match(/^(\+\+\+|---)\s+[ab]?\/?(.*)$/);
    if (diffHeaderMatch && line.startsWith("+++")) {
      currentFile = diffHeaderMatch[2].replace(/^"|"$/g, "").trim();
      isDocOrNonCode = /\.(md|markdown|txt|rst|json|yaml|yml|svg|png|jpg)$/i.test(currentFile) ||
                       currentFile.startsWith("docs/");

      if (currentFile.startsWith(".github/workflows/")) {
        violations.push(`CRITICAL: Prohibited modification to CI workflow file '${currentFile}'.`);
      }
      continue;
    }

    if (line.startsWith("+") && !line.startsWith("+++")) {
      // Skip suppression scanning for documentation / non-code files
      if (!isDocOrNonCode) {
        const isBenign = BENIGN_NOQA_PATTERNS.some((p) => p.test(line));
        if (!isBenign) {
          for (const rule of PROHIBITED_SUPPRESSIONS) {
            if (rule.pattern.test(line)) {
              violations.push(`CHEAT DETECTED in ${currentFile}: Added ${rule.label} -> "${line.slice(1).trim()}"`);
            }
          }
        }
      }
      if (/\b(expect|assert|check|require|should)\s*\(/.test(line)) addedAssertions++;
    }

    if (line.startsWith("-") && !line.startsWith("---")) {
      if (/\b(expect|assert|check|require|should)\s*\(/.test(line)) removedAssertions++;
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
