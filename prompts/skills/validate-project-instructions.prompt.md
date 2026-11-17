---
description: 'Composition wrapper for validating project-context AGENTS.md files using canonical validator skill.'
---

# Validate Project Context AGENTS (Wrapper)

## Mission
Validate project-context `AGENTS.md` files by delegating validation logic to the canonical skill.

## Canonical Skill
- `skills/ack-validate-agents-md/SKILL.md`, in root mode. The former `validate-project-instructions` skill was merged into it (ADR-009).

## Required Inputs
- Target `AGENTS.md` file
- Expected section/session-state/role model
- Validation strictness preferences (if any)

## Wrapper Procedure
1. Load and apply `skills/ack-validate-agents-md/SKILL.md`.
2. Follow skill-local references in this order:
   - `skills/ack-validate-agents-md/references/phase-checks.md`
   - `skills/ack-validate-agents-md/references/report-contract.md`
   - `skills/ack-validate-agents-md/references/scoring.md`

## Output Intent
- Produce a deterministic validation report.
- Include PASS/WARN/FAIL status, score, and actionable findings.

## Wrapper Policy
- Do not duplicate full validation rubrics in this prompt.
- Keep this file concise and defer operational detail to the skill.
- Preserve provider-neutral wording.
