---
name: "create-agents-md"
description: "Create concise, repository-specific AGENTS.md files with operational contract, precedence rules, and drift-control guidance."
metadata:
  source_prompt: "prompts/create-agents-md.prompt.md"
  workflow_type: "generation"
---

# Create AGENTS.md

## Purpose
Generate a complete root `AGENTS.md` file that acts as an operational entrypoint while preserving source-of-truth and repository governance rules.

## When To Use
- Use this skill when adding or refreshing repository `AGENTS.md`.
- Use this skill when repository map, precedence, and session controls must be documented concisely.
- Do not use this skill for project/user instruction file generation.

## Required Inputs
- Repository purpose and canonical paths.
- Source precedence and key references.
- Session-state defaults and command namespace rules.
- Drift-control requirements.

## Workflow
1. Discover repository identity, canonical paths, and source hierarchy.
2. Capture operational contract elements (state model, transitions, ambiguity, commands).
3. Keep content concise; link detailed references instead of copying full specs.
4. Produce complete `AGENTS.md` output with working relative links.
5. Validate portability, clarity, and path correctness.

## Output Expectations
- One complete root `AGENTS.md` file.
- Includes purpose, precedence, repo map, command policy, and drift-control.
- Uses provider-neutral wording and valid relative links.
- Remains scannable and operationally actionable.

## Resources
- Primary source: `../../prompts/create-agents-md.prompt.md`
- Canonical template: `../../templates/AGENTS_template.md`
- Repository example: `../../AGENTS.md`

## Constraints And Safety
- Do not duplicate full normative specs in AGENTS.
- Preserve canonical path stability.
- Keep guidance deterministic and testable.
- Use relative path references only.
