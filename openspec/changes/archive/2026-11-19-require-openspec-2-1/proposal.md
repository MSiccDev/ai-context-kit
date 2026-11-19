# Proposal

## Why

The kit's minimum OpenSpec version is 1.13.2 (ADR-002, spec section 11.6), but OpenSpec 2.x changed how its workflows reach the user: 2.0 installs skills only (`/openspec-propose` in most tools, `$openspec-propose` in Codex) and `openspec update` deletes the 1.x `/opsx:*` command files. Kit skills that name either form are right for one major version and wrong for the other, as the 2.0.0 pre-release review found in `ack-guide`. The maintainer decided the kit relies on the latest OpenSpec, and that detecting an old version and saying how to upgrade is built into the kit rather than left to the user.

## What Changes

- Minimum OpenSpec version becomes **2.1.0** (new ADR-016, superseding ADR-002; spec section 11.6; `templates/AGENTS_template.md`; this repository's `AGENTS.md`).
- New model-invoked skill **`ack-openspec-check`**: reports the CLI version, flags a CLI older than 2.1.0 and generated OpenSpec files older than the CLI, and gives the two-step upgrade (upgrade the CLI, then `openspec update` in the repository). It changes nothing itself.
- `ack-loop-01-readiness`, `ack-create-agents-md`, `ack-validate-agents-md` and `ack-guide` run it before they rely on OpenSpec:
  - CLI older than 2.1.0: stop until the user upgrades (the validator reports a critical finding).
  - Stale generated files: show `openspec update` and continue only after the user runs it or says to proceed (the validator reports a warning).
- `ack-guide` names OpenSpec 2.x skills (`/openspec-propose`, `$openspec-propose`) instead of the 1.x `/opsx:*` commands.
- The new skill is listed in both README skill tables and `skills/README.md`, and gets a `.agents/skills/` link.

Touches: `docs/adr/`, `specs/context_aware_ai_session_spec.md` (11.6), `templates/AGENTS_template.md`, `skills/ack-openspec-check/` (new), `skills/ack-loop-01-readiness/`, `skills/ack-create-agents-md/`, `skills/ack-validate-agents-md/`, `skills/ack-guide/`, `AGENTS.md`, `README.md`, `skills/README.md`, `.agents/skills/`, `CHANGELOG.md`.

## Capabilities

### New Capabilities

None as OpenSpec capability specs. The kit keeps its behavior in the session spec (see `openspec/config.yaml`), so this change sets `skip_specs: true`; the normative rule lands in spec section 11.6.

### Modified Capabilities

None (see above).

## Impact

- Repositories on OpenSpec 1.x stop at the readiness step and in `ack-create-agents-md` until they upgrade; `ack-validate-agents-md` reports them as FAIL.
- `AGENTS.md` files that state `1.13.2` as the minimum get a warning until they state `2.1.0`.
- `openspec update` replaces generated skills and deletes `/opsx:*` command files; on an upgraded repository `.claude/skills/openspec-*` can become symlinks to `.agents/skills/`, which needs git symlink support on Windows.
