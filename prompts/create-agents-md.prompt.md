---
description: 'Compatibility wrapper for creating AGENTS.md using canonical skill workflow.'
---

# Create AGENTS.md (Wrapper)

## Mission
Create repository-specific `AGENTS.md` by delegating workflow logic to the canonical skill.

## Canonical Skill
- `skills/create-agents-md/SKILL.md`

## Required Inputs
- Repository purpose and canonical paths
- Source precedence and key references
- Session-state defaults and command namespace policy
- Drift-control requirements

## Wrapper Procedure
1. Load and apply `skills/create-agents-md/SKILL.md`.
2. Follow skill-local references in this order:
   - `skills/create-agents-md/references/discovery-phases.md`
   - `skills/create-agents-md/references/required-elements.md`
   - `skills/create-agents-md/references/output-format.md`
   - `skills/create-agents-md/references/quality-checklist.md`

## Output Intent
- Produce one complete `AGENTS.md` artifact.
- Include concise completion summary and assumptions.

## Wrapper Policy
- Do not duplicate full workflow logic in this prompt.
- Keep this file concise and defer operational detail to the skill.
- Preserve provider-neutral wording.
