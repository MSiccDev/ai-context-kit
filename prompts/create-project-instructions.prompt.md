---
description: 'Compatibility wrapper for creating project instruction files using canonical skill workflow.'
---

# Create Project Instructions (Wrapper)

## Mission
Create a complete project instruction file by delegating workflow logic to the canonical skill.

## Canonical Skill
- `skills/create-project-instructions/SKILL.md`

## Required Inputs
- Project name/description/current phase
- Tech stack and architecture
- Roles and default session state
- Objectives, testing strategy, documentation standards

## Wrapper Procedure
1. Load and apply `skills/create-project-instructions/SKILL.md`.
2. Follow skill-local references in this order:
   - `skills/create-project-instructions/references/discovery-phases.md`
   - `skills/create-project-instructions/references/output-schema.md`
   - `skills/create-project-instructions/references/command-template.md`
   - `skills/create-project-instructions/references/role-template.md`
   - `skills/create-project-instructions/references/output-format.md`
   - `skills/create-project-instructions/references/quality-checklist.md`

## Output Intent
- Produce one complete `*_project.instructions.md` artifact.
- Include concise completion summary and assumptions.

## Wrapper Policy
- Do not duplicate full workflow logic in this prompt.
- Keep this file concise and defer operational detail to the skill.
- Preserve provider-neutral wording.
