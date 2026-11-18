export type CommandRisk = "SAFE" | "MODERATE" | "BLOCKED";

export interface CommandRiskAssessment {
  risk: CommandRisk;
  reason?: string;
}

const SAFE_COMMANDS = [
  "vitest", "jest", "pytest", "eslint", "ruff", "tsc", "mypy", "cargo check", "go test",
];

const MODERATE_COMMANDS = ["pnpm build", "npm ci", "pip install"];

const BLOCKED_PATTERNS = [
  /curl\s.*\|.*bash/,
  /rm\s+-rf\s+\//,
  /\bsudo\b/,
  /\$GITHUB_TOKEN/,
  /\.env/,
  /wget\s.*\|.*bash/,
];

export function assessCommandRisk(command: string): CommandRiskAssessment {
  // Check blocked patterns first
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(command)) {
      return { risk: "BLOCKED", reason: `Command matches blocked pattern: ${pattern.source}` };
    }
  }

  // Check if it's a known safe command
  const baseCmd = command.trim().split(/\s+/)[0];
  if (SAFE_COMMANDS.some((c) => command.includes(c))) {
    return { risk: "SAFE" };
  }

  // Check moderate commands
  if (MODERATE_COMMANDS.some((c) => command.includes(c))) {
    return { risk: "MODERATE", reason: "Moderate risk — requires --allow-build flag" };
  }

  // Default to moderate for unknown commands
  return { risk: "MODERATE", reason: "Unknown command — defaulting to moderate risk" };
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