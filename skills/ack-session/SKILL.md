---
name: "ack-session"
description: "Show or change the session state (role, phase, output style, tone, interaction mode) or reset it to the project defaults. Run as ack-session <command> [value]."
version: "1.0.0"
allowed-tools: [Read]
disable-model-invocation: true
metadata:
  workflow_type: "session"
  invocation: "user"
---

# Session

## Purpose
Give the user one explicit control for the session state defined in spec section 4.1, replacing the former `/ack.*` commands (ADR-011). Because only the user can start this skill, the assistant cannot switch state on its own (spec section 8.2).

## When To Use
- Use to see the active state, or to change one element of it.
- Use `reset` to return to the defaults in the project `AGENTS.md`.
- Plain-language requests ("switch to Reviewer") need no skill; they follow the same rules (spec section 8.1).
- Do not use to change the project's instructions or `AGENTS.md`; this skill changes only the session.

## Required Inputs
- A command, and a value where the command takes one (see `references/commands.md`).
- The project `AGENTS.md` (Default State, Role Definitions) and the current session state.

## Workflow
1. Read the command and value. With no command, behave as `context`.
2. Check the value against `references/commands.md` and the project's `AGENTS.md`; on a missing or unknown value, follow spec section 8.3 and change nothing.
3. Apply the one change requested. Leave every other element as it was (spec section 7.1).
4. Show the new state in the format of spec section 6.2, using the user's preferred compact format if their user context asks for it.

## Output Expectations
- `context`: the current state, all six elements.
- `mode`, `phase`, `style`, `tone`, `interact`: one line naming the change, then the new state.
- `reset`: the restored defaults, and a note that user and project context were kept.
- Errors: what was wrong and the valid options, with the state unchanged.

## Resources
- Commands and values: `references/commands.md`
- Session state, transitions, confirmation and commands: spec sections 4.1, 6.2, 7 and 8 in `../../specs/context_aware_ai_session_spec.md`

## Constraints And Safety
- Change only what the command names; never infer extra changes.
- Do not write files.
- `reset` never discards user context or project context unless the user says so.
