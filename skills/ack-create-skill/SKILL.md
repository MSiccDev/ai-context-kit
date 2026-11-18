---
name: "ack-create-skill"
description: "Create canonical SKILL.md artifacts with deterministic schema, workflow, safety, and quality checks."
version: "1.1.0"
allowed-tools: [Read, Write, Edit]
disable-model-invocation: true
metadata:
  workflow_type: "generation"
  invocation: "user"
---

# Create Skill

## Purpose
Generate complete `SKILL.md` artifacts for one skill folder, with explicit constraints and reusable references.

## When To Use
- Use this skill when creating a new skill folder under `skills/`.
- Use this skill when regenerating a `SKILL.md` file to align with repository skill standards.
- Do not use this skill for validating an existing skill.

## Required Inputs
- Skill slug (`name`) and target folder path.
- Capability summary and usage triggers.
- Required inputs, workflow outputs, and failure boundaries.
- Safety and portability constraints.

## Workflow
1. Run the discovery phases in `references/discovery-phases.md`. Done when no required field is left open.
2. Fill the frontmatter with `references/field-constraints.md`. Done when every required field is set and each optional field used meets its constraint.
3. Write the seven body sections from `references/output-schema.md`, giving each workflow step a completion criterion (`../ack-validate-skill/references/writing-for-agents.md`). Done when every section has content and every step says when it is done.
4. Apply `references/safety.md`. Done when every risky operation has a confirmation gate.
5. Check the draft against `references/quality-checklist.md` and fix any unchecked item.
6. Return the artifact and completion summary described in `references/output-format.md`.

## Output Expectations
- One complete `SKILL.md` artifact at `skills/{name}/SKILL.md`.
- Frontmatter and folder-name parity are correct.
- Body sections are complete, actionable, and concise.
- Output remains provider-neutral and portable.

## Resources
- Discovery workflow: `references/discovery-phases.md`
- Field constraints: `references/field-constraints.md`
- Output schema: `references/output-schema.md`
- Safety policy: `references/safety.md`
- Output contract: `references/output-format.md`
- Quality checklist: `references/quality-checklist.md`
- Skill template: `../../templates/skill_template/SKILL.md`

## Constraints And Safety
- Keep in `SKILL.md` only what every run needs; move detail that only some cases reach into `references/`.
- Avoid provider-specific lock-in wording.
- Use relative paths for local references.
- Treat `allowed-tools` as optional/experimental unless explicitly required.
