# ADR-004: Archive a change as the last commit on its feature branch

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Decisions](../plans/2.0-adoption-plan.md#decisions)

## Context

Archiving an OpenSpec change merges its spec deltas into `openspec/specs/`. If that happens after merge, specs and code reach the default branch in separate pull requests and can disagree in between. If it happens before review, review feedback can invalidate an already-archived spec.

## Decision

The change is archived as the **last commit on the feature branch, after review approval**.

## Consequences

- Spec deltas and code land in one pull request.
- arc42 and ADR updates happen on the same branch. `operations.archive` lists the arc42 sections to update and promotes `design.md` decisions that pass the ADR test to `docs/adr/` ([ADR-006](ADR-006-adr-home.md)).
- `05-human-in-the-loop` (later `ack-loop-05-commit`) performs the archive step once review is approved.
