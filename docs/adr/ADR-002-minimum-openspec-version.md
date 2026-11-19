# ADR-002: Minimum OpenSpec version

- Status: Superseded by [ADR-016](ADR-016-minimum-openspec-2-1.md)
- Date: 2026-09-27
- Source: [2.0 adoption plan, Decisions](../plans/2.0-adoption-plan.md#decisions)

## Context

[ADR-001](ADR-001-openspec-is-mandatory.md) makes OpenSpec a hard dependency. The kit relies on specific CLI behaviour (`openspec status --json`, `openspec instructions apply --json`, `openspec list --json`, `config.yaml` fields). An older CLI may lack these, and a newer one may change them. Failing on every newer release would block users for no reason.

## Decision

The kit sets OpenSpec's current release, **1.13.2**, as the minimum.

- Older versions fail the check, and the installer offers the upgrade command.
- Newer versions **warn, never fail**.
- The minimum is reviewed every three months.

## Consequences

- The session spec states the minimum, and `ai-context-kit doctor` checks it.
- `init` checks `openspec --version` and waits for consent before any install. It never uses sudo and never edits shell profiles.
- The installer manifest records the OpenSpec version it set up.
- Each quarterly review is a small kit change: spec, doctor constant, and changelog.
