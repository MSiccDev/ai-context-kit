# ADR-001: OpenSpec is mandatory for every change

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Part 2 and Decisions](../plans/2.0-adoption-plan.md#part-2-making-openspec-mandatory)

## Context

The kit owns *who and how*: user context, `AGENTS.md`, session state, validation. It has no contract for *what gets built*. The loop prompts read prose specs from `specs/` or `docs/specs/`, so readiness and the self-review's spec check have nothing firm to test against. OpenSpec provides that contract (`openspec/specs/`, `openspec/changes/<id>/`) and its CLI reports when a change is ready to apply.

An optional integration would leave two paths for work, one with a contract and one without. Every rule downstream, from the readiness gate to the two-axis review, would then need a fallback.

## Decision

Every change in a kit-managed repo goes through OpenSpec, with no exemptions.

- A kit-managed repo contains an initialised `openspec/` and at least one OpenSpec tool integration.
- The Implementation phase starts only against a change that `openspec status --change <id> --json` reports as apply-ready.
- Changes with no behaviour impact still get a change folder, using OpenSpec's `skip_specs: true`.
- The kit customises OpenSpec only through `openspec/config.yaml`. Generated `openspec-*` skills and commands are never edited, because `openspec update` overwrites them.
- The kit repo itself follows this rule from 2.0 on. The session spec stays the normative document instead of being split into capability specs.

## Consequences

- This is a breaking change, so it ships in kit 2.0.0 as a new normative section of `specs/context_aware_ai_session_spec.md`.
- `01-readiness-check` stops unless the target change is apply-ready, and its `specs/` and `docs/specs/` reads go away.
- The self-review's Spec axis checks against `openspec validate --strict` instead of prose.
- Node 20.19 or later becomes a prerequisite for every kit repo, which the installer ([ADR-013](ADR-013-installer-package-and-binary.md)) relies on.
- Chat-only surfaces cannot run the CLI; [ADR-003](ADR-003-manual-mode-is-fully-supported.md) covers them.
- Kit docs name OpenSpec's telemetry opt-out, and the installer asks about it.

## Correction (2026-11-16)

The Decision names `openspec status --change <id> --json` as the apply-ready check. Testing against OpenSpec 1.13.2 and 2.0.0 showed that `status` has no apply-ready field: it reports per-artifact status and `applyRequires`. The command that reports it is `openspec instructions apply --change <id> --json`, whose `state` is `blocked`, `ready` or `all_done`. The decision itself is unchanged; spec section 11.2 and the loop prompts use the correct command.

## Alternatives considered

- **OpenSpec as an option:** rejected, for the two-path reason above.
- **A forked schema (for example `ack-spec-driven` with an `adr` artifact):** out of scope for now. OpenSpec marks schema commands as experimental, and config rules cover the need.
