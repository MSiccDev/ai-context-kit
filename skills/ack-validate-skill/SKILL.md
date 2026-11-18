---
name: "ack-validate-skill"
description: "Validate a SKILL.md for schema, invocation, writing quality, references, safety and portability, and write a scored report."
version: "1.1.0"
allowed-tools: [Read, Write]
disable-model-invocation: true
metadata:
  workflow_type: "validation"
  invocation: "user"
  credits: "Writing checks adapted from mattpocock/skills writing-for-agents (MIT, Copyright (c) 2026 Matt Pocock), https://github.com/mattpocock/skills"
---

# Validate Skill

## Purpose
Validate `SKILL.md` files with structured checks and produce consistent validation reports based on a deterministic scoring rubric. The writing checks in phases 2 and 3 adapt Matt Pocock's writing-for-agents skill.

## When To Use
- Use this skill when validating any `skills/<name>/SKILL.md` artifact.
- Use this skill before accepting skill updates.
- Do not use this skill to generate new skills; use `ack-create-skill`.

## Required Inputs
- Target skill folder path.
- Target `SKILL.md` path.
- Validation strictness expectations (if any).

## Workflow
1. Run the five phases in `references/phase-checks.md`, with the writing checks in `references/writing-for-agents.md`. A phase is done when every check in it has a result.
2. Score each phase with `references/scoring.md`. The phase scores must add up to the reported total; state the sum in the report.
3. Classify every finding as Critical, Warning or Enhancement, each with a concrete fix.
4. Write `SKILL.validation.md` next to the target, as `references/report-contract.md` describes.

## Output Expectations
- A `SKILL.validation.md` report next to the target.
- Status, total score with its sum, and per-phase scores.
- Critical issues, warnings and enhancements, each with a concrete fix.

## Resources
- Phase checks: `references/phase-checks.md`
- Writing checks: `references/writing-for-agents.md`
- Report contract: `references/report-contract.md`
- Scoring model: `references/scoring.md`
- Skill template: `../../templates/skill_template/SKILL.md`

## Constraints And Safety
- Write only the report; leave the validated files unchanged.
- Base every deduction on a check in the phase list, so a re-run gives the same score.
- Preserve provider neutrality.
