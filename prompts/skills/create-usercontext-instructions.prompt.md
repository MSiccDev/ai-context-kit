---
description: 'Composition wrapper for creating user-context instruction files using canonical skill workflow.'
---

# Create User Context Instructions (Wrapper)

## Mission
Create a complete user-context instruction file by delegating workflow logic to the canonical skill.

## Canonical Skill
- `skills/ack-create-user-context/SKILL.md`

## Required Inputs
- Target identity label and role/title
- Privacy expectations
- Technical profile, projects, goals, style, constraints
- Desired output filename/path

## Wrapper Procedure
1. Load and apply `skills/ack-create-user-context/SKILL.md`.
2. Follow skill-local references in this order:
   - `skills/ack-create-user-context/references/discovery-phases.md`
   - `skills/ack-create-user-context/references/output-schema.md`
   - `skills/ack-create-user-context/references/output-format.md`
   - `skills/ack-create-user-context/references/quality-checklist.md`
3. If structured metadata is requested, also apply:
   - `skills/ack-create-user-context/references/json-metadata-schema.md`

## Output Intent
- Produce one complete `*.instructions.md` artifact.
- Include concise assumptions summary.

## Wrapper Policy
- Do not duplicate full workflow logic in this prompt.
- Keep this file concise and defer operational detail to the skill.
- Preserve provider-neutral wording.
