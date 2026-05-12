---
name: "validate-project-instructions"
description: "Validate project-context AGENTS.md files for required sections, session-state model completeness, role quality, and scoring compliance."
version: "1.0.0"
allowed-tools: [Read, Write]
metadata:
  source_prompt: "prompts/validate-project-instructions.prompt.md"
  workflow_type: "validation"
---

# Validate Project Context AGENTS

## Purpose
Validate project-context `AGENTS.md` files with structured checks for required sections, session-state controls, role definitions, and core required-section completeness based on a deterministic scoring rubric.

## When To Use
- Use this skill to validate project-context `AGENTS.md` files.
- Use this skill when reviewing project context quality prior to active use.
- Do not use this skill for user-context instruction validation.

## How to Invoke

Load or attach this file's contents into your AI session to activate the workflow (paste, upload, or reference with `#file:skills/validate-project-instructions/SKILL.md` in VS Code Copilot Chat). In Claude Projects, add it to project knowledge. See [Invoking Skills](../../README.md#invoking-skills) in the README for full platform guidance.

## Required Inputs
- Target project-context `AGENTS.md` path.
- Expected section model and command reference expectations.
- Any strictness preferences for warnings vs required fixes.

## Workflow
1. Run validation phases from `references/phase-checks.md`.
2. Check for `<!-- spec_version: ... -->` comment: flag as WARNING if absent (pre-existing files may predate this requirement); flag as WARNING if present but older than `1.4.2`.
3. Generate report using `references/report-contract.md`.
4. Apply deterministic scoring from `references/scoring.md`.
5. Classify findings into critical/warning/enhancement buckets.
6. Produce project-specific remediation guidance.

## Output Expectations
- Structured markdown report with five validation phases.
- Clear status for critical issues vs warnings.
- Numeric score and grading band.
- Concrete example fixes for major gaps.
- Report schema follows `references/report-contract.md`.
- Scoring and grade bands follow `references/scoring.md`.

## Resources
- Phase checks: `references/phase-checks.md`
- Report contract: `references/report-contract.md`
- Scoring model: `references/scoring.md`
- Example target: `../../AGENTS.md`

## Constraints And Safety
- Keep findings specific and actionable.
- Preserve project terminology when proposing fixes.
- Keep validation language provider-neutral.
- Do not rewrite source files automatically.
