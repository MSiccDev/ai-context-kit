# Proposal

## Why

ADR-015 puts the installer MVP and `ack-setup` in 2.0, and the maintainer decided to build them before `release/2.0.0` (2026-11-19). Plan Part 3, rollout step 1, asks for a spike first: verify each tool's skills folder and instruction file, and record the result in an ADR before any code. The plan's tool table marks several entries "to verify", and Claude Code has since started reading `AGENTS.md` directly, which changes what `init` must write.

## What Changes

- New ADR-017 records, for the 2.0 tools (`claude`, `codex`, `github-copilot`, `agents`), the skills folder, instruction file, invocation spelling and the source of each fact.
- ADR-017 also records the installer decisions taken with the maintainer: 2.0 scope (plan Part 3 rollout steps 1 to 4 and 6; step 5 breadth goes to 2.1), code home (`installer/` in this repository), stack (TypeScript, Vitest, ESM for Node 20.19+), copies instead of symlinks, and a `CLAUDE.md` that imports `AGENTS.md`.
- Plan Part 3's tool table and rollout step 1 are updated to match, with a pointer to ADR-017.
- The open item "register the `@msiccdev` npm scope" is recorded for the maintainer.

Touches: `docs/adr/`, `docs/plans/2.0-adoption-plan.md`, `CHANGELOG.md`. No code yet. Follows ADR-013 and ADR-015.

## Capabilities

### New Capabilities

None as OpenSpec capability specs (see `openspec/config.yaml`); this change sets `skip_specs: true`.

### Modified Capabilities

None.

## Impact

The following changes (MVP, OpenSpec orchestration, `ack-setup` and `install.md`, publish) build on ADR-017's registry instead of the plan's provisional table.
