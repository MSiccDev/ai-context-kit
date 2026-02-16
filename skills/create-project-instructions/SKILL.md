---
name: "create-project-instructions"
description: "Create complete project instruction files using phased discovery, required section coverage, and session-state modeling."
metadata:
  source_prompt: "prompts/create-project-instructions.prompt.md"
  workflow_type: "generation"
---

# Create Project Instructions

## Purpose
Generate complete project instruction files with required sections, role definitions, command namespace controls, and validation-ready structure.

## When To Use
- Use this skill when the task is to create or regenerate a `*_project.instructions.md` file.
- Use this skill when project context must include role/phase/style defaults.
- Do not use this skill for user-context or AGENTS-specific generation.

## Required Inputs
- Project name, description, and current phase.
- Tech stack, architecture, and repository structure.
- Roles, default session state, and command namespace.
- Objectives, testing strategy, and documentation standards.

## Workflow
1. Run phased discovery for identity, stack, roles, session defaults, practices, and roadmap.
2. Normalize responses into required section order.
3. Apply frontmatter rules (`name`, `description`, `applyTo`) and command reference structure.
4. Produce complete output with concrete examples and practical commands.
5. Call out assumptions for missing but required context.

## Output Expectations
- One complete project instruction file with all required sections.
- Session-state and command-reference elements are fully populated.
- Role definitions and examples are project-specific and actionable.
- Output remains provider-neutral.

## Resources
- Primary source: `../../prompts/create-project-instructions.prompt.md`
- Structure baseline: `../../templates/project_template.instructions.md`
- Example reference: `../../projects/ai_context_kit_project.instructions.md`

## Constraints And Safety
- Keep recommendations tied to project scope.
- Avoid placeholders in final command examples unless explicitly unresolved.
- Use relative paths for references.
- Do not introduce provider-specific assumptions.
