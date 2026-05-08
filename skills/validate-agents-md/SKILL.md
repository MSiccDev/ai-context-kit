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

## How to Invoke

Load or attach this file's contents into your AI session to activate the workflow (paste, upload, or reference with `#file:skills/validate-agents-md/SKILL.md` in VS Code Copilot Chat). In Claude Projects, add it to project knowledge. See [Invoking Skills](../../README.md#invoking-skills) in the README for full platform guidance.

## Required Inputs
- Target `AGENTS.md` path.
- Repository path context for link/path validation.
- Policy expectations for session-state and command namespace.

## Workflow
1. Run validation phases from `references/phase-checks.md`.
2. Check for `<!-- spec_version: ... -->` comment: flag as WARNING if absent (pre-existing files may predate this requirement); flag as WARNING if present but older than `1.3.1`.
3. Generate report using `references/report-contract.md`.
4. Apply deterministic scoring from `references/scoring.md`.
5. Classify findings into critical/warning/enhancement buckets.
6. Provide concrete fixes for operational contract gaps.

## Output Expectations
- Structured markdown report with five validation phases.
- Compliance score and pass band.
- Explicit list of critical issues, warnings, and enhancements.
- Example fixes for common structural and policy failures.
- Report schema follows `references/report-contract.md`.
- Scoring and grade bands follow `references/scoring.md`.

## Resources
- Phase checks: `references/phase-checks.md`
- Report contract: `references/report-contract.md`
- Scoring model: `references/scoring.md`
- Example target: `../../AGENTS.md`

## Constraints And Safety
- Keep the scoring rubric deterministic; findings should be repository-specific and actionable.
- Avoid over-prescriptive style-only feedback.
- Preserve provider-neutral language.
- Do not duplicate full normative specs when suggesting fixes.
