# Proposal

## Why

`openspec list --json` reports `root.path` as the project directory that contains `openspec/` (checked with OpenSpec 2.1.0 in this repository: `root.path` is the repository root). `ack-create-agents-md` writes `root.path` "relative to the repository" as the OpenSpec root, which gives `.`, while the template's placeholder says "usually `openspec/`". `ack-validate-agents-md` treats a stated root that does not match `root.path` as critical. A correct `AGENTS.md` that states `openspec/`, as the template suggests, therefore fails validation. The kit repository's own `AGENTS.md` hit this in rollout step 6.

## What Changes

- The OpenSpec root in `AGENTS.md` is the `openspec/` folder: `root.path` plus `openspec/`, written relative to the repository.
- `ack-create-agents-md` 2.0.1: discovery phase 6 and the root schema derive the stated root that way.
- `ack-validate-agents-md` 2.1.1: phase 3 compares the stated root, resolved against the repository, with `root.path` plus `openspec/`. The severity stays critical.
- Both skills' `SKILL.validation.md` and the kit's `AGENTS.validation.md` are re-run.

Touches: `skills/ack-create-agents-md/references/`, `skills/ack-validate-agents-md/references/`, `templates/AGENTS_template.md` (placeholder wording), `CHANGELOG.md`. Follows ADR-001 and ADR-009. No spec section changes: section 11.1 requires naming the root but does not define how it is derived.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. The kit keeps its behavior in `specs/context_aware_ai_session_spec.md` (see `openspec/config.yaml`), so this change sets `skip_specs: true`.

## Impact

`AGENTS.md` files that state `openspec/` now pass the root check. Files written by `ack-create-agents-md` 2.0.0 that state `.` fail it and need `openspec/` instead.
