---
name: "validate-skill"
description: "Validate SKILL.md artifacts for schema, quality, safety, portability, and scoring compliance."
version: "1.0.0"
allowed-tools: [Read, Write]
metadata:
  source_prompt: "prompts/skills/validate-skill.prompt.md"
  workflow_type: "validation"
---

# Validate Skill

## Purpose
Validate `SKILL.md` files with structured checks and produce consistent validation reports based on a deterministic scoring rubric.

## When To Use
- Use this skill when validating any `skills/<name>/SKILL.md` artifact.
- Use this skill before accepting skill updates.
- Do not use this skill to generate new skills.

## How to Invoke

Load or attach this file's contents into your AI session to activate the workflow (paste, upload, or reference with `#file:skills/validate-skill/SKILL.md` in VS Code Copilot Chat). In Claude Projects, add it to project knowledge. See [Invoking Skills](../../README.md#invoking-skills) in the README for full platform guidance.

## Required Inputs
- Target skill folder path.
- Target `SKILL.md` path.
- Validation strictness expectations (if any).

## Workflow
1. Run validation phases from `references/phase-checks.md`.
2. Generate report using `references/report-contract.md`.
3. Apply deterministic scoring from `references/scoring.md`.
4. Classify findings into critical/warning/enhancement buckets.
5. Produce implementation-ready remediation guidance.

## Output Expectations
- Structured markdown validation report.
- PASS/WARN/FAIL status and compliance score.
- Actionable fixes for blocking and non-blocking issues.

## Resources
- Phase checks: `references/phase-checks.md`
- Report contract: `references/report-contract.md`
- Scoring model: `references/scoring.md`
- Skill template: `../../templates/skill_template/SKILL.md`

## Constraints And Safety
- Keep the scoring rubric deterministic; findings should be concise and repeatable.
- Preserve provider neutrality.
- Do not modify validated source files automatically.
