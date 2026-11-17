---
description: 'Composition wrapper for creating SKILL.md files using canonical ack-create-skill workflow.'
---

# Create Skill (Wrapper)

## Mission
Create a `SKILL.md` artifact by delegating workflow logic to the canonical skill.

## Canonical Skill
- `skills/ack-create-skill/SKILL.md`

## Required Inputs
- Skill slug and target folder
- Capability and trigger conditions
- Required inputs/workflow/output expectations
- Safety and compatibility constraints

## Wrapper Procedure
1. Load and apply `skills/ack-create-skill/SKILL.md`.
2. Follow skill-local references in this order:
   - `skills/ack-create-skill/references/discovery-phases.md`
   - `skills/ack-create-skill/references/field-constraints.md`
   - `skills/ack-create-skill/references/output-schema.md`
   - `skills/ack-create-skill/references/safety.md`
   - `skills/ack-create-skill/references/output-format.md`
   - `skills/ack-create-skill/references/quality-checklist.md`

## Output Intent
- Produce one complete `skills/{name}/SKILL.md` artifact.
- Include concise assumptions summary.

## Wrapper Policy
- Do not duplicate full generation rules in this prompt.
- Keep this file concise and defer operational detail to the skill.
- Preserve provider-neutral wording.
