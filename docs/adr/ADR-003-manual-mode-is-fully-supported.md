# ADR-003: Manual mode is fully supported

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Part 2 and Decisions](../plans/2.0-adoption-plan.md#what-mandatory-means)

## Context

The kit is provider-neutral and is used on chat-only surfaces such as Claude Projects, ChatGPT and Le Chat. Those surfaces cannot run the OpenSpec CLI, and OpenSpec's skills are restricted to `Bash(openspec:*)`. [ADR-001](ADR-001-openspec-is-mandatory.md) would otherwise lock these users out of planning.

## Decision

The kit fully supports a **manual mode**:

- Planning (proposal, spec deltas, design, tasks) can happen anywhere, using templates generated from OpenSpec's shipped `spec-driven` schema at each kit release.
- Validate, apply and archive happen in a repo with the CLI.

## Consequences

- Each kit release regenerates the manual-mode templates from the current OpenSpec schema.
- Each generated template carries OpenSpec's MIT license header ([ADR-014](ADR-014-attribution.md)).
- The apply-ready gate still holds: a manually planned change must pass the CLI before implementation starts.
