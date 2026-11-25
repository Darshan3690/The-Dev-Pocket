import { describe, it, expect } from "vitest";
import { assessCommandRisk } from "../src/runners/command-guard.js";
import { auditRepairDiff } from "../src/safety/diff-auditor.js";

describe("Command Guard Compound Checks", () => {
  it("blocks dangerous chained commands", () => {
    const res = assessCommandRisk("npm test && rm -rf /");
    expect(res.risk).toBe("BLOCKED");
  });

  it("marks moderate commands in chained segments", () => {
    const res = assessCommandRisk("npm test && npm run build");
    expect(res.risk).toBe("MODERATE");
  });

  it("allows safe chained commands", () => {
    const res = assessCommandRisk("npm test && ruff check .");
    expect(res.risk).toBe("SAFE");
  });
});
