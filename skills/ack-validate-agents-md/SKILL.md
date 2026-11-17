---
name: "ack-validate-agents-md"
description: "Validate root or nested AGENTS.md files with one scored rubric: structure, operational contract, spec-driven change workflow, project context, clarity, and portability and links. Use before accepting any AGENTS.md change."
version: "2.0.0"
allowed-tools: [Read, Write, Bash]
metadata:
  source_prompt: "prompts/skills/validate-agents-md.prompt.md"
  workflow_type: "validation"
---

# Validate AGENTS.md

## Purpose
Validate an `AGENTS.md` file in **root** or **nested** mode with one combined rubric, and write a scored report. This skill replaces `validate-agents-md` and `validate-project-instructions` (ADR-009).

## When To Use
- Use this skill when adding or updating a root or nested `AGENTS.md`, and before accepting `AGENTS.md` policy changes.
- Do not use this skill for user context files (`ack-validate-user-context`) or skills (`ack-validate-skill`).

## Choosing The Mode
- Target at the repository root: **root** mode. Target in a subfolder: **nested** mode.
- The user may override the mode explicitly.

## Required Inputs
- Target `AGENTS.md` path.
- The repository, for link, path and OpenSpec checks.

## Workflow
1. Determine the mode.
2. Run the six phases in `references/phase-checks.md` for that mode. For phase 3 in root mode, run `openspec list --json`; if the CLI is unavailable, check against the files under `openspec/` and say so in the report.
3. Check for `<!-- spec_version: ... -->`: flag a WARNING if it is absent, or if it is older than `2.0.0-beta.1`.
4. Score each phase with `references/scoring.md`. The phase scores must add up to the reported total; state the sum in the report.
5. Classify findings as Critical, Warning or Enhancement. Any critical finding in `references/scoring.md` makes the status FAIL, whatever the score.
6. Write the report described in `references/report-contract.md`, with concrete fixes.

## Output Expectations
- A report next to the target, named `[original-name].validation.md`.
- Mode, status, total score with its sum, and per-phase scores.
- Critical issues, warnings and enhancements, each with a concrete fix.

## Resources
- Phase checks: `references/phase-checks.md`
- Scoring and critical findings: `references/scoring.md`
- Report contract: `references/report-contract.md`
- Canonical template: `../../templates/AGENTS_template.md`
- Example target: `../../AGENTS.md`

## Constraints And Safety
- Never rewrite the target file; only write the report.
- Run only read-only OpenSpec commands (`openspec list --json`); never `openspec init` or `openspec update`.
- Keep the rubric deterministic and the findings repository-specific.
- Avoid style-only feedback, keep wording provider-neutral, and do not copy normative specification text into fixes.
