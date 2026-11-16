# ADR-012: Interview skills: ack-interview and ack-interview-with-context

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Part 1 and Decisions](../plans/2.0-adoption-plan.md#part-1-what-to-take-from-mattpocockskills)

## Context

The `create-*` skills each ask discovery questions in their own style. mattpocock/skills' `grilling` offers a stronger method: questions in rounds over open decisions, a recommended answer for each, and facts looked up by the agent rather than asked. The kit wants the method under a name that fits its tone.

## Decision

The method is called an **interview**, not grilling:

- **`ack-interview`** (model-invoked) replaces the question style inside every `create-*` skill's discovery phases.
- **`ack-interview-with-context`** (user-invoked) combines the interview with the glossary ([ADR-007](ADR-007-glossary-home.md)). It is the recommended step before `openspec-propose`.

The skill body carries the behaviour: rounds over open decisions, a recommended answer per question, facts looked up, and done only when nothing is left open.

## Consequences

- `rules.proposal` in `openspec/config.yaml` tells the agent to run `ack-interview-with-context` first when a change touches domain language.
- Both skills credit Matt Pocock's `grilling` ([ADR-014](ADR-014-attribution.md)).
- The discovery phases in the `create-*` skills are rewritten to call `ack-interview`.
