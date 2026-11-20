# Proposal

## Why

The maintainer's review of the installer found kit facts copied into `installer/src` (the OpenSpec and Node minimums, the install command, the telemetry opt-out, the tool registry, the marker strings) and the `openspec/config.yaml` prose written inline. The tests assert the same literals, so a change in the kit's own sources (spec section 11.6, the ADRs, `ack-openspec-check`) would leave every test green while the installer drifts.

## What Changes

- **One home for the seeded prose.** New template `templates/openspec_config_block.yaml` holds the `context` and `rules` the installer seeds into `openspec/config.yaml`. The build bundles it with the skills; the installer reads it at runtime; no copy stays in code.
- **Drift tests.** New `installer/test/drift.test.ts` reads each fact from its home and fails when the installer's constant differs:
  - OpenSpec minimum: spec section 11.6, ADR-016, `skills/ack-openspec-check/references/upgrade.md`, `templates/AGENTS_template.md`.
  - Install command: the command block in `upgrade.md`.
  - Node minimum: ADR-018, `installer/package.json` `engines`, `installer/README.md`.
  - Tool registry: ADR-017's table, row by row (id, skills folder, invocation).
  - Marker strings: ADR-013.
  - Telemetry opt-out: spec section 11.8.
- **Tests stop asserting kit literals.** Existing tests import the constants or read the template and source files.

The installer's own messages (prompts, notes, the `AGENTS.md` block wording) have no other home and stay in code.

Touches: `templates/` (new file), `installer/scripts/bundle-skills.mjs`, `installer/src`, `installer/test`, `CHANGELOG.md`. Follows the maintainer's decisions of 2026-11-20: a new change after `installer-openspec`, and a template for the prose.

## Capabilities

### New Capabilities

None as OpenSpec capability specs (see `openspec/config.yaml`); this change sets `skip_specs: true`.

### Modified Capabilities

None.

## Impact

Changing a minimum version, the install command, a registry row or the marker strings now fails the installer's tests until code and source agree. The seeded `config.yaml` text changes by editing the template alone.
