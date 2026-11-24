import { describe, it, expect } from "vitest";
import { auditRepairDiff } from "../src/safety/diff-auditor.js";

describe("diff-auditor", () => {
  it("exports auditRepairDiff function", () => {
    expect(typeof auditRepairDiff).toBe("function");
  });
});
