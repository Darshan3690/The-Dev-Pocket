export type CommandRisk = "SAFE" | "MODERATE" | "BLOCKED";

export interface CommandRiskAssessment {
  risk: CommandRisk;
  reason?: string;
}

const SAFE_COMMANDS = [
  "vibeci",
  "vitest",
  "jest",
  "pytest",
  "eslint",
  "ruff",
  "black",
  "clang-format",
  "tsc",
  "mypy",
  "cargo check",
  "go test",
  "npm test",
  "pnpm test",
  "npm run typecheck",
  "pnpm run typecheck",
];

const MODERATE_COMMANDS = [
  "pnpm build",
  "npm ci",
  "npm run build",
  "pip install",
  "cargo build",
  "cmake",
];

const BLOCKED_PATTERNS = [
  /curl\s.*\|.*bash/,
  /rm\s+-rf\s+\//,
  /\bsudo\b/,
  /\$GITHUB_TOKEN/,
  /(?:cat|type|cp|mv|curl|echo)\s+.*\.env(?:\s|$)/,
  /wget\s.*\|.*bash/,
];

export function assessSubcommandRisk(subcmd: string): CommandRiskAssessment {
  const trimmed = subcmd.trim();
  if (!trimmed) return { risk: "SAFE" };

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(trimmed)) {
      return { risk: "BLOCKED", reason: `Command matches blocked pattern: ${pattern.source}` };
    }
  }

  if (SAFE_COMMANDS.some((c) => trimmed.startsWith(c) || trimmed.includes(` ${c}`) || trimmed === c)) {
    return { risk: "SAFE" };
  }

  if (MODERATE_COMMANDS.some((c) => trimmed.startsWith(c) || trimmed.includes(` ${c}`) || trimmed === c)) {
    return { risk: "MODERATE", reason: `Moderate risk (${trimmed}) — requires --allow-build flag` };
  }

  return { risk: "MODERATE", reason: `Unknown command segment (${trimmed}) — defaulting to moderate risk` };
}

export function assessCommandRisk(command: string): CommandRiskAssessment {
  // Check full un-split command first for whole pipeline blocked patterns (e.g. curl ... | bash)
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(command)) {
      return { risk: "BLOCKED", reason: `Command matches blocked pattern: ${pattern.source}` };
    }
  }

  // Split on compound shell operators: &&, ||, ;, |
  const segments = command.split(/&&|\|\||;/).map((s) => s.trim()).filter(Boolean);

  let highestRisk: CommandRisk = "SAFE";
  let combinedReason: string | undefined;

  for (const seg of segments) {
    const assessment = assessSubcommandRisk(seg);
    if (assessment.risk === "BLOCKED") {
      return assessment;
    }
    if (assessment.risk === "MODERATE") {
      highestRisk = "MODERATE";
      combinedReason = combinedReason ? `${combinedReason}; ${assessment.reason}` : assessment.reason;
    }
  }

  return { risk: highestRisk, reason: combinedReason };
}

export function isCommandAllowed(
  assessment: CommandRiskAssessment,
  allowBuild: boolean = false
): { allowed: boolean; reason?: string } {
  if (assessment.risk === "BLOCKED") {
    return { allowed: false, reason: assessment.reason };
  }
  if (assessment.risk === "MODERATE" && !allowBuild) {
    return { allowed: false, reason: assessment.reason };
  }
  return { allowed: true };
}
