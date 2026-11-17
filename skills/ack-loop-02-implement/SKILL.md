---
name: "ack-loop-02-implement"
description: "Implementation loop step 02: implement the approved task group of an OpenSpec change task by task on a feature branch, ticking each task only after its build and tests pass. Use after an approved readiness report, or to fix blocked review findings."
version: "1.0.0"
allowed-tools: [Read, Write, Edit, Bash]
disable-model-invocation: true
metadata:
  workflow_type: "loop"
  loop_step: "02"
  invocation: "user"
---

# Loop 02: Implementation

## Purpose
Implement exactly the task group approved in the readiness report, with tests at the agreed seams, keeping `tasks.md` in step with what actually passes. After a blocked self-review, reopen the affected tasks and fix them through the same gate.

Loop order: `ack-loop-01-readiness` → **02 implement** → `ack-loop-03-review` → `ack-loop-04-learnings` (optional) → `ack-loop-05-commit`.

## When To Use
- Use after the user approves the readiness report.
- Use after a `STATUS: BLOCKED` self-review, to fix its findings.
- Do not use without an apply-ready change; run `ack-loop-01-readiness` instead.

## Required Inputs
- The approved readiness report (change id and task group), or the blocked review report.
- The OpenSpec change: `proposal.md`, `design.md`, `tasks.md` and its spec deltas.
- A working build and test setup.

## Workflow
1. Follow `references/procedure.md` in order: fixing review findings (when applicable), the `state: ready` gate, then task-by-task work.
2. Work on a feature branch; never on `main`, `master`, `dev`, `develop` or `development`.
3. Tick a task in `tasks.md` only after its build and tests pass.
4. Report what was implemented, as the procedure lists.

## Output Expectations
- Code and tests for the approved tasks only, on a feature branch, uncommitted.
- `tasks.md` updated to match passing work.
- An implementation report: tasks ticked or left open (with reasons), new progress and `state`, tests and seams, build and test output, docs and ADRs updated, and any place the change itself should be updated.

## Resources
- Procedure: `references/procedure.md`
- Spec section 11.2 (implementation gate): `../../specs/context_aware_ai_session_spec.md`

## Constraints And Safety
- Do not commit; committing happens in `ack-loop-05-commit` after explicit go-ahead.
- Do not add dependencies without an explicit decision.
- Do not edit generated `openspec-*` skills or commands.
- If the change itself is wrong, stop and propose updating it rather than diverging.
