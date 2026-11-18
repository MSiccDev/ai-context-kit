---
name: "ack-create-user-context"
description: "Create complete user-context instruction files using a structured discovery workflow and repository format rules."
version: "1.1.0"
allowed-tools: [Read, Write, Edit]
disable-model-invocation: true
metadata:
  workflow_type: "generation"
  invocation: "user"
---

# Create User Context Instructions

## Purpose
Generate a complete user-context instruction file with required sections, privacy-aware content handling, and consistent output formatting.

## When To Use
- Use this skill when the task is to create or regenerate a `*_usercontext.instructions.md` file.
- Use this skill when user context must be gathered through structured phases.
- Do not use this skill for project `AGENTS.md` (project context) files.

## Required Inputs
- Target identity label and role/title.
- Privacy expectations (full detail vs placeholders).
- Technical profile, projects, goals, style, and constraints.
- Desired output filename/path.

## Workflow
1. Run the discovery phases in `references/discovery-phases.md`. Done when no required field is left open.
2. Map the findings onto the sections in `references/output-schema.md`. Done when all 15 sections have content in order.
3. Apply the format contract in `references/output-format.md`, and stamp `spec_version: "2.0.0-beta.1"` in the YAML frontmatter.
4. If the user asks for structured metadata, add it with `references/json-metadata-schema.md`. Done when the JSON is valid and states nothing the markdown does not.
5. Check the draft against `references/quality-checklist.md` and fix any unchecked item.
6. Return the artifact and completion summary described in `references/output-format.md`.

## Output Expectations
- One complete `*.instructions.md` file for user context.
- Required section coverage and logical ordering are preserved.
- Privacy handling is explicit and consistent.
- Output contract and summary format follow `references/output-format.md`.

## Resources
- Discovery workflow: `references/discovery-phases.md`
- Output schema: `references/output-schema.md`
- Optional metadata schema: `references/json-metadata-schema.md`
- Output contract: `references/output-format.md`
- Quality checklist: `references/quality-checklist.md`
- Structure baseline: `../../templates/usercontext_template.instructions.md`
- Example reference: `../../usercontexts/sample_usercontext.instructions.md`

## Constraints And Safety
- Preserve sensitive data boundaries; prefer placeholders when requested.
- Use relative paths for references.
- Avoid unrelated recommendations outside user-context scope.
