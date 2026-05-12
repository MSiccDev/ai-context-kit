---
name: "validate-usercontext-instructions"
description: "Validate user-context instruction files against schema, section completeness, quality checks, and scoring criteria."
version: "1.0.0"
allowed-tools: [Read, Write]
metadata:
  source_prompt: "prompts/validate-usercontext-instructions.prompt.md"
  workflow_type: "validation"
---

# Validate User Context Instructions

## Purpose
Validate user-context instruction files and produce structured reports with issues, recommendations, and a compliance score based on a deterministic scoring rubric.

## When To Use
- Use this skill to validate `*_usercontext.instructions.md` files.
- Use this skill before publishing or reusing a user-context file.
- Do not use this skill for project `AGENTS.md` (project context) files.

## How to Invoke

Load or attach this file's contents into your AI session to activate the workflow (paste, upload, or reference with `#file:skills/validate-usercontext-instructions/SKILL.md` in VS Code Copilot Chat). In Claude Projects, add it to project knowledge. See [Invoking Skills](../../README.md#invoking-skills) in the README for full platform guidance.

## Required Inputs
- Target file path.
- Expected spec version and required sections.
- Validation strictness expectations (if any).

## Workflow
1. Run validation phases from `references/phase-checks.md`.
2. Check for `spec_version` field in YAML frontmatter: flag as WARNING if absent (pre-existing files may predate this requirement); flag as WARNING if present but older than `1.4.2`.
3. Generate report using `references/report-contract.md`.
4. Apply deterministic scoring from `references/scoring.md`.
5. Classify findings into critical/warning/enhancement buckets.
6. Produce implementation-ready recommendations.

## Output Expectations
- A markdown validation report with phase-by-phase findings.
- Overall PASS/WARN/FAIL state and numeric score.
- Actionable fixes for critical and warning issues.
- Migration guidance when relevant.
- Report schema follows `references/report-contract.md`.
- Scoring and grade bands follow `references/scoring.md`.

## Resources
- Phase checks: `references/phase-checks.md`
- Report contract: `references/report-contract.md`
- Scoring model: `references/scoring.md`
- Example target: `../../usercontexts/sample_usercontext.instructions.md`
- Example report: `../../usercontexts/sample_usercontext.validation.md`

## Constraints And Safety
- Preserve privacy boundaries in findings and examples.
- Keep recommendations implementation-ready and non-ambiguous.
- Use provider-neutral language.
- Do not modify validated source files automatically.
