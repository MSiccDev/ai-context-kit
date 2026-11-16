# ADR-007: The glossary lives in arc42 section 12 when arc42 exists

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Decisions](../plans/2.0-adoption-plan.md#decisions)

## Context

2.0 adopts a ubiquitous-language glossary with "avoid" synonyms, adapted from mattpocock/skills' `domain-modeling` and its `CONTEXT.md`. The arc42 toolkit already has a glossary in section 12. Two glossaries would drift apart.

## Decision

arc42 is the master of all architecture docs.

- **When arc42 exists:** section 12 holds the terms. Its alias column serves as the "avoid" list, and `CONTEXT.md` only points to it.
- **Without arc42:** `CONTEXT.md` holds the terms.

## Consequences

- `ack-interview` writes terms through `arc42-section-12` when arc42 is present.
- The `context` field of `openspec/config.yaml` points to whichever glossary applies, so OpenSpec planning uses the same vocabulary.
