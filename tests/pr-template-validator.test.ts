import { describe, it, expect } from "vitest";
import { validatePrContentAgainstTemplate } from "../src/core/pr-template-validator.js";

describe("PR Template Validator Guardrail", () => {
  const sampleTemplate = `
# Description
Please provide a summary of the change.

# Type of Change
- [ ] Bug fix
- [ ] New feature

# Risk Level
Risk: Low / Medium / High

# Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
`;

  it("fails if required sections are missing or checkboxes uncompleted", () => {
    const invalidPrText = `
# Description
Fixed a bug in parser.
- [ ] My code follows the style guidelines of this project
`;
    const res = validatePrContentAgainstTemplate(sampleTemplate, invalidPrText);
    expect(res.valid).toBe(false);
    expect(res.missingSections).toContain("Type of Change");
    expect(res.uncompletedCheckboxes.length).toBeGreaterThan(0);
    expect(res.missingRiskLevel).toBe(true);
  });

  it("passes when all sections and completed checkboxes and risk level are present", () => {
    const validPrText = `
# Description
Fixed a bug in parser.

# Type of Change
- [x] Bug fix

# Risk Level
Risk: Low

# Checklist
- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my own code
`;
    const res = validatePrContentAgainstTemplate(sampleTemplate, validPrText);
    expect(res.valid).toBe(true);
    expect(res.missingSections.length).toBe(0);
    expect(res.uncompletedCheckboxes.length).toBe(0);
    expect(res.missingRiskLevel).toBe(false);
  });
});
