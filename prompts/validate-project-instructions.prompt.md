---
description: 'Compatibility wrapper for validating project instruction files using canonical validator skill.'
---

# Validate Project Instructions (Wrapper)

## Mission
Validate project instruction files by delegating validation logic to the canonical skill.

## Canonical Skill
- `skills/validate-project-instructions/SKILL.md`

## Required Inputs
- Target `*_project.instructions.md` file
- Expected section/session-state/role model
- Validation strictness preferences (if any)

## Wrapper Procedure
1. Load and apply `skills/validate-project-instructions/SKILL.md`.
2. Follow skill-local references in this order:
   - `skills/validate-project-instructions/references/phase-checks.md`
   - `skills/validate-project-instructions/references/report-contract.md`
   - `skills/validate-project-instructions/references/scoring.md`

## Output Intent
- Produce a deterministic validation report.
- Include PASS/WARN/FAIL status, score, and actionable findings.

## Wrapper Policy
- Do not duplicate full validation rubrics in this prompt.
- Keep this file concise and defer operational detail to the skill.
- Preserve provider-neutral wording.
