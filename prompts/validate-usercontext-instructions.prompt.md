---
description: 'Compatibility wrapper for validating user-context instruction files using canonical validator skill.'
---

# Validate User Context Instructions (Wrapper)

## Mission
Validate user-context instruction files by delegating validation logic to the canonical skill.

## Canonical Skill
- `skills/validate-usercontext-instructions/SKILL.md`

## Required Inputs
- Target `*_usercontext.instructions.md` file
- Spec version expectation
- Validation strictness preferences (if any)

## Wrapper Procedure
1. Load and apply `skills/validate-usercontext-instructions/SKILL.md`.
2. Follow skill-local references in this order:
   - `skills/validate-usercontext-instructions/references/phase-checks.md`
   - `skills/validate-usercontext-instructions/references/report-contract.md`
   - `skills/validate-usercontext-instructions/references/scoring.md`

## Output Intent
- Produce a deterministic validation report.
- Include PASS/WARN/FAIL status, score, and actionable findings.

## Wrapper Policy
- Do not duplicate full validation rubrics in this prompt.
- Keep this file concise and defer operational detail to the skill.
- Preserve provider-neutral wording.
