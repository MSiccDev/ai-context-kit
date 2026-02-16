---
name: "plan-lifecycle-management"
description: "Manage plan file lifecycle, frontmatter status transitions, and open/executed tracking consistency under plans/."
metadata:
  source_docs: "plans/README.md, plans/plan-status.sh, AGENTS.md"
  workflow_type: "governance"
---

# Plan Lifecycle Management

## Purpose
Maintain consistent plan lifecycle behavior, including plan creation standards, status transitions, and execution tracking metadata.

## When To Use
- Use this skill when adding, updating, or closing plan files in `plans/`.
- Use this skill when validating open/executed plan state correctness.
- Do not use this skill for non-plan artifact validation.

## Required Inputs
- Target `plans/*.prompt.md` file(s).
- Current status and expected transition (`open` or `executed`).
- Execution metadata when marking plans executed (`executed_at`, `execution_ref`).

## Workflow
1. Confirm each plan file has valid YAML frontmatter.
2. Validate status value and required metadata for executed plans.
3. Ensure the plan is scoped to `plans/` and uses repository conventions.
4. Run plan status checks and reconcile mismatches.
5. Record updates without introducing unrelated changes.

## Output Expectations
- Plan files with valid lifecycle metadata.
- Deterministic open/executed classification.
- Consistent execution references for auditability.

## Resources
- Policy source: `../../plans/README.md`
- Status utility: `../../plans/plan-status.sh`
- Governance context: `../../AGENTS.md`

## Constraints And Safety
- Do not move plan files outside `plans/`.
- Keep status transitions explicit and traceable.
- Use date format `YYYY-MM-DD` for `executed_at`.
- Avoid mutating unrelated plan content when applying lifecycle updates.
