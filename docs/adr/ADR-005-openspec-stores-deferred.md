# ADR-005: OpenSpec stores are deferred

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Decisions](../plans/2.0-adoption-plan.md#decisions)

## Context

OpenSpec stores were raised as a possible integration point during planning. 2.0 already carries a breaking spec change, skill renames and a new installer, and nothing in that scope depends on stores.

## Decision

OpenSpec stores are **not part of 2.0**. They will be revisited later.

## Consequences

- The 2.0 spec, templates and installer assume a single repo-local `openspec/` root.
- A later ADR will supersede this one if stores are adopted.
