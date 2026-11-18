import crypto from "node:crypto";

export interface FailureFingerprint {
  hash: string;
  category: string;
  checkName: string;
  errorCode?: string;
  file: string;
  line?: number;
  column?: number;
  timestamp: string;
}

export interface ClassifiedFailure {
  fingerprints: FailureFingerprint[];
  summary: string;
}

const FAILURE_PATTERNS = [
  {
    category: "TYPESCRIPT_ERROR",
    pattern: /error TS(\d+):\s*(.*?)(?:\s*\((\d+),(\d+)\))?/gi,
    extract: (match: RegExpExecArray) => ({
      errorCode: `TS${match[1]}`,
      message: match[2],
      line: match[3] ? parseInt(match[3], 10) : undefined,
      column: match[4] ? parseInt(match[4], 10) : undefined,
    }),
  },
  {
    category: "ESLINT_ERROR",
    pattern: /(\d+:\d+)\s+(error|warning)\s+([\w-]+)\s+(.*)/gi,
    extract: (match: RegExpExecArray) => ({
      errorCode: match[3],
      message: match[4],
      line: match[1]?.split(":")[0] ? parseInt(match[1].split(":")[0], 10) : undefined,
      column: match[1]?.split(":")[1] ? parseInt(match[1].split(":")[1], 10) : undefined,
    }),
  },
  {
    category: "IMPORT_ERROR",
    pattern: /Cannot\s+find\s+module\s+['"]([^'"]+)['"]/gi,
    extract: (match: RegExpExecArray) => ({
      errorCode: "MODULE_NOT_FOUND",
      message: `Cannot find module ${match[1]}`,
      line: undefined,
      column: undefined,
    }),
  },
  {
    category: "TEST_FAILURE",
    pattern: /(?:✕|failed|FAIL)\s+(.*)/gi,
    extract: (match: RegExpExecArray) => ({
      errorCode: "TEST_FAILED",
      message: match[1],
      line: undefined,
      column: undefined,
    }),
  },
  {
    category: "SYNTAX_ERROR",
    pattern: /(?:SyntaxError|Unexpected token)\s*(.*)/gi,
    extract: (match: RegExpExecArray) => ({
      errorCode: "SYNTAX_ERROR",
      message: match[1],
      line: undefined,
      column: undefined,
    }),
  },
];

export function classifyFailure(
  stdout: string,
  stderr: string,
  checkName: string
): ClassifiedFailure {
  const combined = stdout + "\n" + stderr;
  const fingerprints: FailureFingerprint[] = [];

  // Strip ANSI color codes
  const clean = combined.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, "");

  for (const pattern of FAILURE_PATTERNS) {
    const regex = pattern.pattern;
    let match: RegExpExecArray | null;
    regex.lastIndex = 0;
    while ((match = regex.exec(clean)) !== null) {
      const extracted = pattern.extract(match);
      const hashInput = `${pattern.category}|${checkName}|${extracted.errorCode ?? "unknown"}|unknown`;
      const hash = crypto.createHash("sha256").update(hashInput).digest("hex").substring(0, 16);

      fingerprints.push({
        hash,
        category: pattern.category,
        checkName,
        errorCode: extracted.errorCode,
        file: "unknown",
        line: extracted.line,
        column: extracted.column,
        timestamp: new Date().toISOString(),
      });
    }
  }

  const summary = fingerprints.length > 0
    ? `Found ${fingerprints.length} failure(s) across ${new Set(fingerprints.map((f) => f.category)).size} category(ies)`
    : "No classified failures found";

  return { fingerprints, summary };
}