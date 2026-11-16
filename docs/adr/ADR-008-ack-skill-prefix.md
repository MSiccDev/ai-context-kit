# ADR-008: Skills are renamed with the ack- prefix, verb first

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Decisions and Skill names in 2.0](../plans/2.0-adoption-plan.md#skill-names-in-20)

## Context

Skill names such as `create-skill` and `validate-skill` are namespaced only when installed as a plugin. Copied into shared folders like `.agents/skills/`, they can collide with other skill sets, OpenSpec's `openspec-*` skills among them. The per-repo installer ([ADR-013](ADR-013-installer-package-and-binary.md)) copies skills into exactly those folders.

## Decision

In 2.0 every kit skill carries the **`ack-` prefix** and a **verb-first** name, like OpenSpec's. This includes skills adapted from mattpocock/skills. The full mapping is in the plan's [Skill names in 2.0](../plans/2.0-adoption-plan.md#skill-names-in-20) table, for example:

| Today | 2.0 |
| --- | --- |
| `create-usercontext-instructions` | `ack-create-user-context` |
| `repository-drift-control` | `ack-drift-control` |
| `create-checkpoint` | `ack-create-checkpoint` |

## Consequences

- This is a breaking change for anyone invoking skills by name. The 2.0.0 changelog carries a migration note with the full table.
- The installer manages only `ack-*` folders listed in its manifest, never `openspec-*`.
- The installer's closing message and `ack-guide` state the prefix.
- Each skill declares who may invoke it (user or model), and the installer generates the Codex `agents/openai.yaml` sidecar from that.
