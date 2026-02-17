---
description: 'Compatibility wrapper for validating AGENTS.md files using canonical validator skill.'
---

# Validate AGENTS.md (Wrapper)

## Mission
Validate `AGENTS.md` files by delegating validation logic to the canonical skill.

## Canonical Skill
- `skills/validate-agents-md/SKILL.md`

## Required Inputs
- Target `AGENTS.md` path
- Repository context for path/link validation
- Policy expectations for operational contract checks

## Wrapper Procedure
1. Load and apply `skills/validate-agents-md/SKILL.md`.
2. Follow skill-local references in this order:
   - `skills/validate-agents-md/references/phase-checks.md`
   - `skills/validate-agents-md/references/report-contract.md`
   - `skills/validate-agents-md/references/scoring.md`

## Output Intent
- Produce a deterministic validation report.
- Include PASS/WARN/FAIL status, score, and actionable findings.

## Wrapper Policy
- Do not duplicate full validation rubrics in this prompt.
- Keep this file concise and defer operational detail to the skill.
- Preserve provider-neutral wording.
