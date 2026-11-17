---
name: "ack-loop-05-commit"
description: "Implementation loop step 05: present a commit-readiness summary (change progress, review result, door type, blast radius) and checklist, commit only on explicit go-ahead, and archive the OpenSpec change as the last commit after review approval. Use to close each loop."
version: "1.0.0"
allowed-tools: [Read, Bash]
metadata:
  workflow_type: "loop"
  loop_step: "05"
---

# Loop 05: Human In The Loop

## Purpose
Put the human decision at the end of every loop: summarize what is ready, get an explicit go-ahead before any commit, and archive the OpenSpec change once its last task group is done and the review is approved.

Loop order: `ack-loop-01-readiness` → `ack-loop-02-implement` → `ack-loop-03-review` → `ack-loop-04-learnings` (optional) → **05 commit**.

## When To Use
- Use after the self-review (and learnings, if run), to decide on the commit.
- Use again after review approval to archive a change whose `state` is `all_done`.
- Do not use when the self-review is `STATUS: BLOCKED`; the procedure sends the user back to `ack-loop-02-implement`.

## Required Inputs
- The self-review report, and the implementation report.
- The current `openspec instructions apply --change <id> --json` output.

## Workflow
1. Follow `references/procedure.md`: check the review status, summarize, present the checklist, and wait.
2. Commit only after the user's explicit go-ahead.
3. After the commit: if tasks remain, the next loop starts at `ack-loop-01-readiness`; if `state` is `all_done`, wait for review approval, then archive as the procedure describes.

## Output Expectations
- A summary with change progress, review result per axis, door type and blast radius, followed by the commit checklist.
- After approval of an `all_done` change: arc42 and ADR updates, then `openspec archive <id> --yes --json`, presented for a separate go-ahead as the last commit.

## Resources
- Procedure: `references/procedure.md`
- Spec section 11.7 (archive timing): `../../specs/context_aware_ai_session_spec.md`

## Constraints And Safety
- Do not commit, stage files or run any git command until the user gives explicit go-ahead.
- Archive only after review approval, and only as the last commit on the feature branch.
- `openspec archive` changes the repository; present its result and wait for go-ahead before committing it.
