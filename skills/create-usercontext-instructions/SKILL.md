---
name: "create-usercontext-instructions"
description: "Create complete user-context instruction files using a structured discovery workflow and repository format rules."
metadata:
  source_prompt: "prompts/create-usercontext-instructions.prompt.md"
  workflow_type: "generation"
---

# Create User Context Instructions

## Purpose
Generate a complete user-context instruction file with required sections, privacy-aware content handling, and consistent output formatting.

## When To Use
- Use this skill when the task is to create or regenerate a `*_usercontext.instructions.md` file.
- Use this skill when user context must be gathered through structured phases.
- Do not use this skill for project instruction files or AGENTS files.

## Required Inputs
- Target identity label and role/title.
- Privacy expectations (full detail vs placeholders).
- Technical profile, projects, goals, style, and constraints.
- Desired output filename/path.

## Workflow
1. Run phased discovery for identity, expertise, projects, style, communication, and constraints.
2. Capture only actionable context and normalize to the required section order.
3. Apply frontmatter rules and formatting conventions.
4. Produce a complete markdown artifact and concise summary of assumptions.
5. Flag missing high-impact inputs explicitly.

## Output Expectations
- One complete `*.instructions.md` file for user context.
- Required section coverage and logical ordering are preserved.
- Privacy handling is explicit and consistent.
- Output is provider-neutral.

## Resources
- Primary source: `../../prompts/create-usercontext-instructions.prompt.md`
- Structure baseline: `../../templates/usercontext_template.instructions.md`
- Example reference: `../../usercontexts/sample_usercontext.instructions.md`

## Constraints And Safety
- Keep provider-neutral wording.
- Preserve sensitive data boundaries; prefer placeholders when requested.
- Use relative paths for references.
- Avoid unrelated recommendations outside user-context scope.
