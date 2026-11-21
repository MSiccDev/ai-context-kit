# ADR-015: What ships in 2.0 and what waits for 2.1

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Decisions](../plans/2.0-adoption-plan.md#decisions)

## Context

The 2.0 plan adopts or adapts about thirty items, and many of them depend on each other. Shipping everything at once would delay the breaking changes users need to plan for. Shipping them piecemeal would break users more than once.

## Decision

**2.0** contains:

- OpenSpec rules ([ADR-001](ADR-001-openspec-is-mandatory.md)) and the loop rewiring
- The user versus model invocation split
- `ack-interview` ([ADR-012](ADR-012-interview-primitive.md)) and `ack-tdd`
- The two-axis self-review
- `ack-guide`, `ack-setup` and `ack-session` ([ADR-011](ADR-011-ack-session-skill.md))
- The merged AGENTS.md skills ([ADR-009](ADR-009-merge-agents-md-skills.md))
- The installer MVP ([ADR-013](ADR-013-installer-package-and-binary.md))

**Everything else waits for 2.1.**

## Consequences

- All breaking changes, including the skill renames ([ADR-008](ADR-008-ack-skill-prefix.md)), land together in 2.0.0, with one migration note.
- Items such as `diagnosing-bugs`, `research`, handoff, per-skill docs pages and the remaining installer tools (`cursor`, `gemini`, `vibe`) are 2.1 candidates. [ADR-019](ADR-019-openspec-required-for-the-loop.md) (OpenSpec required only for the implementation loop) is planned for 2.1.
- [ADR-014](ADR-014-attribution.md) puts attribution in 2.0, even though the plan's release-split row doesn't list it.
