# Proposal

## Why

The last pass before `release/2.0.0`. Spec section 11.8 requires kit documentation to name the OpenSpec telemetry opt-out, but the README, the `AGENTS.md` template and `ack-openspec-check` did not. Several README and changelog statements no longer matched the kit after the installer work, and the kit repository's `.agents/skills/` had no link to `ack-setup`.

## What Changes

- Telemetry opt-out (`openspec config set telemetry.enabled false`, `OPENSPEC_TELEMETRY=0`) named in:
  - the README install block
  - `templates/AGENTS_template.md`, and `ack-create-agents-md` 2.3.0's `references/root-schema.md`
  - `ack-openspec-check` 1.1.0 (`references/upgrade.md`, after an install or upgrade)
- README:
  - no skill counts
  - all five model-invoked skills listed
  - the Codex section describes the installer's sidecars
  - the repository tree is current
- `AGENTS.md` Overview: the kit is installed per repository, no longer a template repository.
- `.agents/skills/ack-setup` link added.
- Drift tests, and their CI paths: telemetry opt-outs in four documents, and one `.agents/skills` link per `skills/ack-*` folder. `installer-drift.yml` also runs for `README.md` and `.agents/skills/**`.
- `CHANGELOG.md` `[Unreleased]`:
  - Migration describes the installer path.
  - The template-repository sections become one "Coming from the template repository" note (maintainer's decision, 2026-11-21).
  - Stale facts removed: "not yet published", the test count, the link count.

Touches `templates/AGENTS_template.md` and skills `ack-openspec-check`, `ack-create-agents-md`; no spec section changes; no new ADR.

## Capabilities

### New Capabilities

None as OpenSpec capability specs (see `openspec/config.yaml`); this change sets `skip_specs: true`.

### Modified Capabilities

None.

## Impact

- Generated `AGENTS.md` files gain one telemetry sentence in their spec-driven section.
