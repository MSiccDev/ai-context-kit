---
name: "validate-agents-md"
description: "Validate AGENTS.md files for structural completeness, operational contract coverage, neutrality, and repository alignment."
metadata:
  source_prompt: "prompts/validate-agents-md.prompt.md"
  workflow_type: "validation"
---

# Validate AGENTS.md

## Purpose
Validate `AGENTS.md` files to ensure they are concise, operationally complete, and aligned with repository structure and governance.

## When To Use
- Use this skill when adding or updating root or nested `AGENTS.md` files.
- Use this skill before accepting AGENTS policy changes.
- Do not use this skill for user/project instruction validation.

## Required Inputs
- Target `AGENTS.md` path.
- Repository path context for link/path validation.
- Policy expectations for session-state and command namespace.

## Workflow
1. Validate core file presence and structural readability.
2. Check operational contract elements (state model, transitions, ambiguity, commands, defaults).
3. Evaluate clarity/actionability and conciseness.
4. Validate neutrality and portability.
5. Validate link integrity and repository path alignment; generate scored report.

## Output Expectations
- Structured markdown report with five validation phases.
- Compliance score and pass band.
- Explicit list of critical issues, warnings, and enhancements.
- Example fixes for common structural and policy failures.

## Resources
- Primary source: `../../prompts/validate-agents-md.prompt.md`
- Example target: `../../AGENTS.md`

## Constraints And Safety
- Keep findings deterministic and repository-specific.
- Avoid over-prescriptive style-only feedback.
- Preserve provider-neutral language.
- Do not duplicate full normative specs when suggesting fixes.
