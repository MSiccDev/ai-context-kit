# Design

## Context

ADR-001 rejected optional OpenSpec for one reason: two paths for building work would give every downstream rule a fallback. The maintainer chose option C (OpenSpec required only for the loop), documentation, content and skill or prompt libraries (for example the maintainer's arc42 toolkit) as the cases, and "ADR now, build in 2.1" (2026-11-21).

## Goals / Non-Goals

**Goals:**
- Record the decision and its 2.1 scope before `release/2.0.0`.

**Non-Goals:**
- Any behaviour change in 2.0.0.

## Decisions

- **A new ADR narrows ADR-001.** The ADR rules forbid rewriting an accepted decision, so ADR-001 gets only a status note.

## Test Seams

Agreed with the maintainer on 2026-11-21:
- Path scan: every relative link in ADR-019, the ADR index, ADR-001 and ADR-015 resolves.
- The ADR index lists ADR-019 with status "Accepted; implementation planned for 2.1" and ADR-001 as narrowed by it.
- `openspec validate adr-openspec-scope --strict` passes.

## Risks / Trade-offs

- None for 2.0.0.
