# Proposal

## Why

Between 2026-11-19 and 2026-11-20 the installer workflow ran 14 times with 6 jobs each (about 84 jobs), and the version-sync workflow 26 times. Three causes: every merge into `development` reran the full matrix that its pull request had already passed; archive commits and documentation-only changes started all six jobs although only the drift tests read those files; and runs superseded by a newer push kept running.

## What Changes

- Both workflows: a `concurrency` group per workflow and ref with `cancel-in-progress: true`, so a newer push cancels the older run.
- Both workflows: no `push: development` trigger (the maintainer's decision, 2026-11-20). `push: main` and `workflow_dispatch` stay.
- `installer.yml` (full matrix, 3 operating systems × 2 Node versions) runs only for `installer/**`, `skills/**`, `LICENSE`, `THIRD_PARTY_NOTICES.md` and its own file.
- New `installer-drift.yml`: one Linux job (Node 22.12.0) with audit, type check and tests, for `specs/**`, `docs/adr/**`, `templates/**`, `openspec/**` and its own file. The drift tests read those homes.

Touches: `.github/workflows/`, `CHANGELOG.md`. No skill, template or spec changes.

## Capabilities

### New Capabilities

None as OpenSpec capability specs (see `openspec/config.yaml`); this change sets `skip_specs: true`.

### Modified Capabilities

None.

## Impact

- Fewer runs; on the recent history about two thirds of the installer jobs would not have run.
- A merge into `development` is not retested after its pull request. If `development` moves between a pull request's run and its merge, the merged result is untested until the next pull request; branch protection's "Require branches to be up to date" closes that gap if wanted.
