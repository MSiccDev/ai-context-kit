# Proposal

## Why

From 2026-11-20 to 2026-11-22, 91 workflow runs started (79 for pull requests, 12 for pushes to `main`), still many after `ci-trim`. The causes:
- Version sync ran for every feature pull request, because each one edits `CHANGELOG.md`.
- Pull requests from `main` into `development` reran every workflow that `main` had just passed.
- Markdown-only skill changes started the six-job matrix.
- Pushes to `main` repeated the pull request's checks.
- The release `verify` job repeated the full test suite.
- The matrix audited dependencies six times.
- Every push to a draft pull request ran CI.

The maintainer asked for every optimisation except moving the archive commit, which spec section 11.7 forbids (decided 2026-11-22).

## What Changes

- **All pull-request jobs:** skip drafts. They start on `ready_for_review` (types `opened`, `synchronize`, `reopened`, `ready_for_review`), and skip pull requests whose head branch is `main`.
- **`installer.yml`:**
  - The matrix runs for `installer/**` and its own file only, with 4 jobs: Linux on Node 22.12.0 and 24, Windows and macOS on Node 24.
  - `npm audit` runs in the Linux Node 24 job only.
  - No `push: main`.
- **`installer-drift.yml`:** adds `skills/**`, `LICENSE` and `THIRD_PARTY_NOTICES.md`; no `push: main`.
- **`version-sync.yml`:** runs for pull requests into `main` only; no `push: main`.
- **`release.yml`:** `verify` drops the test, audit and type-check steps; it builds (`prepack`) and dry-runs the release.
- A contract drift test in `installer/test/drift.test.ts`; a `CHANGELOG.md` entry.

Touches `.github/workflows/` and the installer's drift tests; no skill, template or spec section.

## Capabilities

### New Capabilities

None as OpenSpec capability specs (see `openspec/config.yaml`); this change sets `skip_specs: true`.

### Modified Capabilities

None.

## Impact

- **Trade-off:** a pull request into `main` is the last test of what lands there. Enabling "Require branches to be up to date before merging" on `main` makes that test the merge result.
- **Version-sync scripts:** a change to them reaches CI only with the next release pull request.
- **Feedback timing:** CI no longer gives feedback on drafts; mark a pull request ready to run it.
