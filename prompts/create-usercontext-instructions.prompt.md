---
description: 'Compatibility wrapper for creating user-context instruction files using canonical skill workflow.'
---

# Create User Context Instructions (Wrapper)

## Mission
Create a complete user-context instruction file by delegating workflow logic to the canonical skill.

## Canonical Skill
- `skills/create-usercontext-instructions/SKILL.md`

## Required Inputs
- Target identity label and role/title
- Privacy expectations
- Technical profile, projects, goals, style, constraints
- Desired output filename/path

## Wrapper Procedure
1. Load and apply `skills/create-usercontext-instructions/SKILL.md`.
2. Follow skill-local references in this order:
   - `skills/create-usercontext-instructions/references/discovery-phases.md`
   - `skills/create-usercontext-instructions/references/output-schema.md`
   - `skills/create-usercontext-instructions/references/output-format.md`
   - `skills/create-usercontext-instructions/references/quality-checklist.md`
3. If structured metadata is requested, also apply:
   - `skills/create-usercontext-instructions/references/json-metadata-schema.md`

## Output Intent
- Produce one complete `*.instructions.md` artifact.
- Include concise assumptions summary.

## Wrapper Policy
- Do not duplicate full workflow logic in this prompt.
- Keep this file concise and defer operational detail to the skill.
- Preserve provider-neutral wording.
