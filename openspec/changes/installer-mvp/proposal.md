# Proposal

## Why

ADR-015 puts the installer MVP in 2.0, and ADR-017 fixed its tool registry and layout. Plan Part 3, rollout step 2, is the first code: a per-repo installer that copies the kit's skills into each tool's folder, records what it wrote, and updates without overwriting a user's edits.

## What Changes

- New package in `installer/`: `@msiccdev/ai-context-kit`, bin `ai-context-kit`, TypeScript compiled to ESM for Node 20.19 or later, no runtime dependencies, tests with Vitest (ADR-013, ADR-017).
- Commands:
  - `init [path] --tools <ids|all|none> --yes`: detects tools (or takes `--tools`), copies the bundled `ack-*` skills into each tool's skills folder, generates Codex sidecars, writes the kit marker blocks in `AGENTS.md` and (for `claude`) `CLAUDE.md`, and writes `.ai-context-kit/manifest.json`.
  - `update [--force]`: refreshes managed files whose hash still matches the manifest; writes `<file>.ai-context-kit-new` beside an edited file; leaves a deleted file deleted.
  - `doctor [--json]`: checks the Node version, manifest integrity (missing and locally edited files), the marker blocks, and installed skills older than the package.
  - `tools`: lists tool ids, skills folders and invocation spelling.
- A CI workflow builds and tests `installer/` on Linux, macOS and Windows for pull requests that touch it.

Not in this change: OpenSpec steps (step 3), `ack-setup` and `install.md` (step 4), publishing (step 6).

Touches: `installer/` (new), `.github/workflows/installer.yml` (new), `.gitignore`, `CHANGELOG.md`. The README install block changes at the publish step.

## Capabilities

### New Capabilities

None as OpenSpec capability specs (see `openspec/config.yaml`); this change sets `skip_specs: true`.

### Modified Capabilities

None.

## Impact

- The kit repository gains a Node build and test setup inside `installer/`; the rest of the repository stays Markdown.
- Nothing is published yet; users keep installing as today.
