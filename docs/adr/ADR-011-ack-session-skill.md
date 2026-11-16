# ADR-011: One ack-session skill replaces the /ack.* commands

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Decisions](../plans/2.0-adoption-plan.md#decisions)

## Context

Session state (role, phase, style, tone, interaction mode) is changed through `/ack.*` commands defined only in `AGENTS.md` text. The rule "no silent transitions" depends on the model honouring that text, and nothing stops an agent from switching state itself.

## Decision

A single **user-invoked `ack-session` skill** takes the arguments `context`, `mode`, `phase`, `style`, `tone`, `interact` and `reset`.

## Consequences

- Because only the user can invoke it, the tool itself enforces "no silent transitions".
- Spec section 8 and the template's command table are rewritten for the new skill.
- Plain-language switching ("switch to Reviewer") still works through `AGENTS.md`.
- The `/ack.*` command names are retired, and the 2.0.0 changelog includes a migration note.
