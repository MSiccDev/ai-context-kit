# Architecture Decision Records

Decisions that shape the AI Context Kit, one file per decision ([ADR-006](ADR-006-adr-home.md)). ADR-001 to ADR-015 record the [2.0 adoption plan's Decisions](../plans/2.0-adoption-plan.md#decisions), settled on 2026-09-27.

## Format

Each ADR has a status, date and source, followed by Context, Decision and Consequences sections. Some also have an Alternatives considered section. Write a new ADR only if the decision is hard to reverse, would surprise a newcomer, and is a real trade-off. To change a decision, add a new ADR and mark the old one `Superseded by ADR-NNN`. Never rewrite an accepted ADR's decision.

## Index

| ID | Decision | Status |
| --- | --- | --- |
| [ADR-001](ADR-001-openspec-is-mandatory.md) | OpenSpec is mandatory for every change | Accepted |
| [ADR-002](ADR-002-minimum-openspec-version.md) | Minimum OpenSpec version 1.13.2; newer versions warn, never fail | Superseded by ADR-016 |
| [ADR-003](ADR-003-manual-mode-is-fully-supported.md) | Manual mode is fully supported on chat-only surfaces | Accepted |
| [ADR-004](ADR-004-archive-timing.md) | Archive a change as the last commit on its feature branch | Accepted |
| [ADR-005](ADR-005-openspec-stores-deferred.md) | OpenSpec stores are deferred past 2.0 | Accepted |
| [ADR-006](ADR-006-adr-home.md) | ADRs live in `docs/adr/`, indexed by arc42 section 9 | Accepted |
| [ADR-007](ADR-007-glossary-home.md) | The glossary lives in arc42 section 12 when arc42 exists | Accepted |
| [ADR-008](ADR-008-ack-skill-prefix.md) | Skills are renamed with the `ack-` prefix, verb first | Accepted |
| [ADR-009](ADR-009-merge-agents-md-skills.md) | Merge the AGENTS.md creators and validators | Accepted |
| [ADR-010](ADR-010-loop-prompts-become-skills.md) | Loop prompts become skills; prompt wrappers are removed | Accepted |
| [ADR-011](ADR-011-ack-session-skill.md) | One `ack-session` skill replaces the `/ack.*` commands | Accepted |
| [ADR-012](ADR-012-interview-primitive.md) | Interview skills: `ack-interview` and `ack-interview-with-context` | Accepted |
| [ADR-013](ADR-013-installer-package-and-binary.md) | Installer package `@msiccdev/ai-context-kit` | Accepted |
| [ADR-014](ADR-014-attribution.md) | Credit every adapted source where it lands and once centrally | Accepted |
| [ADR-015](ADR-015-release-split.md) | What ships in 2.0 and what waits for 2.1 | Accepted |
| [ADR-016](ADR-016-minimum-openspec-2-1.md) | Minimum OpenSpec version 2.1.0; the kit detects old CLIs and stale generated files | Accepted |
| [ADR-017](ADR-017-installer-tool-registry.md) | Installer tool registry and layout for 2.0 (`installer/`, TypeScript, copies not symlinks) | Accepted; Node minimum superseded by ADR-018 |
| [ADR-018](ADR-018-installer-node-22.md) | The installer requires Node 22.12 or later; workflows use Node 24 actions | Accepted |
