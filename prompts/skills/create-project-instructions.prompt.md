---
description: 'Composition wrapper for creating project-context AGENTS.md files using canonical skill workflow.'
---

# Create Project Context AGENTS (Wrapper)

## Mission
Create a complete project-context `AGENTS.md` artifact by delegating workflow logic to the canonical skill.

## Canonical Skill
- `skills/ack-create-agents-md/SKILL.md`, in root mode. The former `create-project-instructions` skill was merged into it (ADR-009).

## Required Inputs
- Project name/description/current phase
- Tech stack and architecture
- Roles and default session state
- Objectives, testing strategy, documentation standards

## Wrapper Procedure
1. Load and apply `skills/ack-create-agents-md/SKILL.md`.
2. Follow skill-local references in this order:
   - `skills/ack-create-agents-md/references/discovery-phases.md`
   - `skills/ack-create-agents-md/references/root-schema.md` (root mode) or `skills/ack-create-agents-md/references/nested-schema.md` (nested mode)
   - `skills/ack-create-agents-md/references/command-template.md`
   - `skills/ack-create-agents-md/references/role-template.md`
   - `skills/ack-create-agents-md/references/output-format.md`
   - `skills/ack-create-agents-md/references/quality-checklist.md`

## Output Intent
- Produce one complete `AGENTS.md` artifact.
- Include concise completion summary and assumptions.

## Wrapper Policy
- Do not duplicate full workflow logic in this prompt.
- Keep this file concise and defer operational detail to the skill.
- Preserve provider-neutral wording.
