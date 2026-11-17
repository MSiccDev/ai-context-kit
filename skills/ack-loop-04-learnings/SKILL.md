---
name: "ack-loop-04-learnings"
description: "Implementation loop step 04 (optional): teach the key lessons from the implemented task group and its two-axis review, mapped to the user's background and stack. Use after a passing self-review when the user wants to learn from the step."
version: "1.0.0"
allowed-tools: [Read]
metadata:
  workflow_type: "loop"
  loop_step: "04"
---

# Loop 04: Learnings

## Purpose
Turn the step just completed into a short, concrete learning report: why the change mattered, what the code and tests show, and what to study next, related to the user's own background.

Loop order: `ack-loop-01-readiness` → `ack-loop-02-implement` → `ack-loop-03-review` → **04 learnings** (optional) → `ack-loop-05-commit`.

## When To Use
- Use after a `STATUS: PASS` self-review, when the user wants a learning report.
- Skip it when the user doesn't; the loop continues at `ack-loop-05-commit`.
- Do not use after a `STATUS: BLOCKED` review; fix the findings first.

## Required Inputs
- The implementation and review reports.
- The change's `proposal.md` and `design.md`.
- The user context and `AGENTS.md`, to resolve the stack and background values.

## Workflow
1. Follow `references/procedure.md`: resolve the stack context, check the review status, then build the report.
2. Ask only for stack values that cannot be resolved from the user context, `AGENTS.md` or the session.

## Output Expectations
- A learning report with the eleven items the procedure lists, including 3 to 5 key learnings, what to read next, and one follow-up exercise.

## Resources
- Procedure: `references/procedure.md`

## Constraints And Safety
- Make no code changes in this step.
- Do not redo the readiness step or the review.
- Do not force weak analogies to the user's background.
