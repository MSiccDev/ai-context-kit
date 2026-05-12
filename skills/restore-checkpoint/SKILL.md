---
name: "restore-checkpoint"
description: "Load a checkpoint artifact at session start and restore the session state it describes per spec section 4.4 restore rules. Use only when a checkpoint file is explicitly provided at the beginning of a session."
version: "1.0.0"
allowed-tools: [Read]
---

# Restore Checkpoint

## Purpose
Load a checkpoint artifact and restore the session state it describes, surfacing any conflicts with active instruction files before any work begins.

## When To Use
- At the start of a session when the user provides a checkpoint file.
- Do not apply checkpoint state mid-session or without the user explicitly providing the artifact.

## Required Inputs
- The checkpoint artifact file (provided by the user at session start).
- Active instruction files (user context and project AGENTS.md) already loaded in context.

## Workflow
1. Read the checkpoint artifact and confirm it contains the `checkpoint: true` marker and all required schema fields per `references/restore-rules.md`.
2. For each field in the checkpoint, compare it against any values defined in active instruction files.
3. For each conflict found: surface it explicitly — state the conflicting values from both sources and which source each value comes from.
4. Ask the user which source to apply for each conflict.
5. Apply instruction file values as the default for any conflict the user does not respond to.
6. Present the full resolved session state to the user for confirmation.
7. Do not begin any task work until the user has confirmed the restored state.

## Output Expectations
- A clear confirmation summary showing all restored session state values and their sources.
- Each conflict recorded as resolved, with the winning source noted.
- Any missing required fields flagged, with the user asked to supply them or apply the instruction file default.

## Resources
- `references/restore-rules.md` for spec section 4.4.3 restore rules, conflict resolution logic, and examples.

## Constraints And Safety
- Never apply checkpoint state silently — always confirm with the user first.
- Instruction files are the default source when the user does not respond to a conflict prompt.
- If the checkpoint is missing required fields, flag them before proceeding.
- Checkpoint state is only valid when provided at session start — do not apply it mid-session.
