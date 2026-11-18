import { execa } from "execa";
import { assessCommandRisk, isCommandAllowed } from "./command-guard.js";

export interface CheckResult {
  id: string;
  command: string;
  exitCode: number;
  durationMs: number;
  stdout: string;
  stderr: string;
  redacted: boolean;
}

const SECRET_PATTERNS = [
  /(sk-[a-zA-Z0-9]{20,})/g,
  /(ghp_[a-zA-Z0-9]{20,})/g,
  /(gho_[a-zA-Z0-9]{20,})/g,
  /(Bearer\s+[a-zA-Z0-9\-\._~\+\/]+=*)/gi,
  /(api[_-]?key["']?\s*[:=]\s*["']?)([^"'\s,}]+)/gi,
];

function redactSecrets(text: string): { redacted: string; hadSecrets: boolean } {
  let hadSecrets = false;
  let result = text;
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.test(result)) {
      hadSecrets = true;
      result = result.replace(pattern, "$1[REDACTED]");
    }
  }
  return { redacted: result, hadSecrets };
}

export async function runCheck(
  id: string,
  command: string,
  allowBuild: boolean = false,
  timeoutMs: number = 120000
): Promise<CheckResult> {
  const assessment = assessCommandRisk(command);
  const allowed = isCommandAllowed(assessment, allowBuild);

  if (!allowed.allowed) {
    return {
      id,
      command,
      exitCode: -1,
      durationMs: 0,
      stdout: "",
      stderr: `BLOCKED: ${assessment.reason}`,
      redacted: false,
    };
  }

  const start = Date.now();
  try {
    const result = await execa(command, { shell: true, timeout: timeoutMs });
    const durationMs = Date.now() - start;
    const { redacted: redactedStdout, hadSecrets: stdoutSecrets } = redactSecrets(result.stdout);
    const { redacted: redactedStderr, hadSecrets: stderrSecrets } = redactSecrets(result.stderr);

    return {
      id,
      command,
      exitCode: result.exitCode ?? 1,
      durationMs,
      stdout: redactedStdout,
      stderr: redactedStderr,
      redacted: stdoutSecrets || stderrSecrets,
    };
  } catch (err: any) {
    const durationMs = Date.now() - start;
    const { redacted: redactedStdout, hadSecrets: stdoutSecrets } = redactSecrets(err.stdout ?? "");
    const { redacted: redactedStderr, hadSecrets: stderrSecrets } = redactSecrets(err.stderr ?? "");

    return {
      id,
      command,
      exitCode: err.exitCode ?? 1,
      durationMs,
      stdout: redactedStdout,
      stderr: redactedStderr,
      redacted: stdoutSecrets || stderrSecrets,
    };
  }
}