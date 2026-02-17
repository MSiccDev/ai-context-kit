---
description: 'Compatibility wrapper for validating SKILL.md files using canonical validator skill.'
---

# Validate Skill (Wrapper)

## Mission
Validate `SKILL.md` files by delegating validation logic to the canonical skill.

## Canonical Skill
- `skills/validate-skill/SKILL.md`

## Required Inputs
- Target skill folder path
- Target `SKILL.md` file
- Validation strictness preferences (if any)

## Wrapper Procedure
1. Load and apply `skills/validate-skill/SKILL.md`.
2. Follow skill-local references in this order:
   - `skills/validate-skill/references/phase-checks.md`
   - `skills/validate-skill/references/report-contract.md`
   - `skills/validate-skill/references/scoring.md`

## Output Intent
- Produce deterministic `SKILL.validation.md` report output.
- Include PASS/WARN/FAIL status, score, and actionable findings.

## Wrapper Policy
- Do not duplicate full validation rubrics in this prompt.
- Keep this file concise and defer operational detail to the skill.
- Preserve provider-neutral wording.
