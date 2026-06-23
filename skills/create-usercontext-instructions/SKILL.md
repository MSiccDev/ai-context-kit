---
name: "create-usercontext-instructions"
description: "Create complete user-context instruction files using a structured discovery workflow and repository format rules."
version: "1.0.0"
allowed-tools: [Read, Write, Edit]
metadata:
  source_prompt: "prompts/skills/create-usercontext-instructions.prompt.md"
  workflow_type: "generation"
---

# Create User Context Instructions

## Purpose
Generate a complete user-context instruction file with required sections, privacy-aware content handling, and consistent output formatting.

## When To Use
- Use this skill when the task is to create or regenerate a `*_usercontext.instructions.md` file.
- Use this skill when user context must be gathered through structured phases.
- Do not use this skill for project `AGENTS.md` (project context) files.

## How to Invoke

Load or attach this file's contents into your AI session to activate the workflow (paste, upload, or reference with `#file:skills/create-usercontext-instructions/SKILL.md` in VS Code Copilot Chat). In Claude Projects, add it to project knowledge. See [Invoking Skills](../../README.md#invoking-skills) in the README for full platform guidance.

## Required Inputs
- Target identity label and role/title.
- Privacy expectations (full detail vs placeholders).
- Technical profile, projects, goals, style, and constraints.
- Desired output filename/path.

## Workflow
1. Run phased discovery using `references/discovery-phases.md`.
2. Normalize findings into required schema using `references/output-schema.md`.
3. Apply format contract from `references/output-format.md`.
4. Stamp `spec_version: "1.4.2"` in the YAML frontmatter of the generated artifact.
5. Validate against `references/quality-checklist.md` before final output.
6. If structured metadata is requested, apply `references/json-metadata-schema.md`.

## Output Expectations
- One complete `*.instructions.md` file for user context.
- Required section coverage and logical ordering are preserved.
- Privacy handling is explicit and consistent.
- Output is provider-neutral.
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
- Keep provider-neutral wording.
- Preserve sensitive data boundaries; prefer placeholders when requested.
- Use relative paths for references.
- Avoid unrelated recommendations outside user-context scope.
