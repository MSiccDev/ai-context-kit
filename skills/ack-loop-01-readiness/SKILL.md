---
name: "ack-loop-01-readiness"
description: "Implementation loop step 01: confirm the target OpenSpec change is apply-ready, pick its next task group, and report readiness before any code is written. Use at the start of every loop."
version: "1.0.0"
allowed-tools: [Read, Bash]
disable-model-invocation: true
metadata:
  workflow_type: "loop"
  loop_step: "01"
  invocation: "user"
---

# Loop 01: Readiness Check

## Purpose
Gate implementation on an apply-ready OpenSpec change (spec section 11.2, no change, no code), choose the next task group from its `tasks.md`, load the context the later steps reuse, and report what would be touched.

Loop order: **01 readiness** → `ack-loop-02-implement` → `ack-loop-03-review` → `ack-loop-04-learnings` (optional) → `ack-loop-05-commit`.

## When To Use
- Use at the start of each loop, before any implementation.
- Use again when the implementation step finds the change is no longer `ready`.
- Do not use to plan a change that does not exist yet; create it with the project's OpenSpec propose workflow first.

## Required Inputs
- A repository with `AGENTS.md` and an OpenSpec root.
- The OpenSpec CLI (`openspec`), version 1.13.2 or later. Without it the step stops: manual mode allows planning, not implementation.
- Optionally, the change or task the user wants to target.

## Workflow
1. Follow `references/procedure.md` in order: confirm OpenSpec, determine the target change, check apply-readiness with `openspec instructions apply --change <id> --json`, read the context, pick the next task group.
2. Stop wherever the procedure says to stop (no CLI, old version, no root, no change, `blocked` state).
3. Reply with the readiness report and wait for explicit go-ahead.

## Output Expectations
- A short readiness report: change id, `state`, task progress, the task group with task ids, files to touch, test seams, applicable skills, affected arc42 sections and ADRs, the OpenSpec version, and any gaps.
- No changes to the repository.

## Resources
- Procedure: `references/procedure.md`
- Spec section 11 (spec-driven change workflow): `../../specs/context_aware_ai_session_spec.md`

## Constraints And Safety
- Read-only: do not edit files, create branches or run commands that change the repository.
- Do not guess the target change; ask when it is ambiguous.
- Stop and wait for explicit go-ahead before the implementation step.
