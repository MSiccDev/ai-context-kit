---
name: "ack-validate-user-context"
description: "Validate user-context instruction files against schema, section completeness, quality checks, and scoring criteria."
version: "1.2.0"
allowed-tools: [Read, Write]
disable-model-invocation: true
metadata:
  workflow_type: "validation"
  invocation: "user"
---

# Validate User Context Instructions

## Purpose
Validate user-context instruction files and produce structured reports with issues, recommendations, and a compliance score based on a deterministic scoring rubric.

## When To Use
- Use this skill to validate `*_usercontext.instructions.md` files.
- Use this skill before publishing or reusing a user-context file.
- Do not use this skill for project `AGENTS.md` (project context) files.

## Required Inputs
- Target file path.
- Expected spec version and required sections.
- Validation strictness expectations (if any).

## Workflow
1. Run the five phases in `references/phase-checks.md`. A phase is done when every check in it has a result.
2. Check for the `spec_version` field in the YAML frontmatter: flag a WARNING if it is absent (older files may predate it) or older than `2.0.0-beta.1`.
3. Score each phase with `references/scoring.md`. The phase scores must add up to the reported total; state the sum in the report.
4. Classify every finding as Critical, Warning or Enhancement, each with a concrete fix.
5. Write the report next to the target, as `references/report-contract.md` describes.

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
- Use provider-neutral language.
- Write only the report; leave the validated file unchanged.
