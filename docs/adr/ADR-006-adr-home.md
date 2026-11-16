# ADR-006: ADRs live in docs/adr/, indexed by arc42 section 9

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Decisions](../plans/2.0-adoption-plan.md#decisions)

## Context

ADRs had no fixed home. Before 1.5.3 the loop prompts read `docs/adrs/`, the arc42 toolkit treats section 9 as the ADR home, and mattpocock/skills, whose ADR practice the plan adopts, keeps its ADRs in `.agents/adr/`. With several candidate locations, agents could miss decisions.

## Decision

- Each decision gets **one file in `docs/adr/`**, keeping `ADR-001`-style IDs.
- The arc42 section 9 decision log links to those files. arc42 stays the master index, and content may live in linked files.
- A decision becomes an ADR only if it passes a three-part test: it is hard to reverse, it would surprise a newcomer, and it is a real trade-off.
- `docs/adr/README.md` lists every ADR, because the loop prompts read it first.
- The kit repo's own ADRs follow the same rule, starting with this set.

## Consequences

- The loop prompts already read `docs/adr/` and fall back to `docs/adrs/` (1.5.3), so existing projects keep working.
- An arc42-toolkit release is needed: `arc42-section-09` writes ADR files, and `arc42-lint` rule 4 reads them.
- `operations.archive` promotes `design.md` decisions that pass the test into `docs/adr/` ([ADR-004](ADR-004-archive-timing.md)).
- The kit does not adopt mattpocock/skills' `.agents/adr/` location; only the practice of recording ADRs.
