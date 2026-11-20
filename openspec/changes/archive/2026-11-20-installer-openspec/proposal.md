# Proposal

## Why

ADR-001 makes OpenSpec mandatory, and plan Part 3 step 3 makes the installer set it up in the same run that installs the kit's skills. Today `init` installs skills only; users still have to install OpenSpec, run `openspec init` and answer the telemetry question themselves, and spec section 11.8 requires the kit to ask before leaving telemetry on.

## What Changes

`init` runs the OpenSpec steps after installing the skills:
1. Node: 22.12 or later (ADR-018), otherwise stop with guidance.
2. OpenSpec CLI: 2.1.0 or later (ADR-016). Missing or older: print the install command (npm, or the reported package manager) and stop with exit 1. The installer never installs global packages.
3. Telemetry: ask before any OpenSpec call; non-interactive runs take `--openspec-telemetry on|off` and default to off. Every OpenSpec call the installer makes runs with `OPENSPEC_TELEMETRY=0` until the answer is known; "off" runs `openspec config set telemetry.enabled false`, which the prompt says is machine-wide.
4. No `openspec/` root: run `openspec init --tools <same ids>` and relay its output. Existing root: run `openspec update --dry-run --json` and, if files are stale, print the `openspec update` steps without running them.
5. `openspec/config.yaml`: when neither `context` nor `rules` is present, add both inside `# ai-context-kit:start` / `# ai-context-kit:end`; otherwise leave the file and report it. `update` refreshes only that block.
6. Verify with `openspec list --json` (non-null root) and record the OpenSpec version in the manifest.

`doctor` gains OpenSpec checks: CLI version, `openspec/` root, stale generated files, and the `config.yaml` block when the manifest records one.

Touches: `installer/` (new OpenSpec module, `init`, `update`, `doctor`, manifest), `installer/README.md`, `CHANGELOG.md`. Follows ADR-001, ADR-016, ADR-018 and spec section 11.8.

## Capabilities

### New Capabilities

None as OpenSpec capability specs (see `openspec/config.yaml`); this change sets `skip_specs: true`.

### Modified Capabilities

None.

## Impact

- `init` now needs the OpenSpec CLI and exits 1 without it, after installing the skills.
- The manifest gains `openspec` (version, telemetry answer) and records the `config.yaml` block.
