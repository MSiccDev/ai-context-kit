---
name: "ack-loop-03-review"
description: "Implementation loop step 03: review the implemented task group on two separate axes, Spec (openspec validate --strict, task and scenario coverage) and Standards (bugs, boundaries, tests, docs), and open the report with STATUS: PASS or STATUS: BLOCKED. Use after every implementation step."
version: "1.0.0"
allowed-tools: [Read, Bash]
metadata:
  workflow_type: "loop"
  loop_step: "03"
---

# Loop 03: Self-Review

## Purpose
Find concrete issues in the task group just implemented, or confirm there are none, on two axes kept apart: does the code do what the change says (Spec), and is the code sound (Standards).

Loop order: `ack-loop-01-readiness` → `ack-loop-02-implement` → **03 review** → `ack-loop-04-learnings` (optional) → `ack-loop-05-commit`.

## When To Use
- Use after each implementation step, before learnings or commit.
- Do not use as a redesign discussion or for broad repository discovery.

## Required Inputs
- The implementation report.
- The OpenSpec change and its spec deltas.
- The changed files, their diffs, and build and test output.

## Workflow
1. Follow `references/procedure.md`: run the Spec axis and the Standards axis, in parallel sub-agents when available, otherwise one after the other.
2. Run `openspec validate <id> --strict --json` for the Spec axis.
3. Open the report with the status line, then the Spec and Standards findings in separate sections.

## Output Expectations
- A report that opens with `STATUS: PASS` or `STATUS: BLOCKED`, and nothing before it.
- BLOCKED when either axis has a blocking finding, including a failed `openspec validate --strict`.
- Findings per axis, each with priority, file and line, problem, impact and expected correction.

## Resources
- Procedure: `references/procedure.md`

## Constraints And Safety
- Make no code changes in this step.
- Read only files outside the readiness context that are needed to judge the change.
- Keep the two axes' findings separate; do not merge or re-rank them.
