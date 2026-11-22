# Design

## Context

Four workflows: `installer.yml` (matrix), `installer-drift.yml` (one job), `version-sync.yml` and `release.yml`. GitHub matches `paths` against the whole pull request's diff, so every push to a pull request reruns the workflows its paths select.

## Goals / Non-Goals

**Goals:**
- Each check runs once, at the point where it can fail, with the fewest jobs that still cover it.

**Non-Goals:**
- Moving the archive commit (spec section 11.7, maintainer's decision).
- Third-party path filters.

## Decisions

- **Job-level `if` instead of workflow filters for drafts and `main` heads.** Workflow triggers cannot test the draft state or the head branch. A skipped job counts as passed for required checks.
- **Windows and macOS on Node 24 only.** Those runners exist for the platform differences: paths, symbolic links, CRLF, the `.cmd` shell. The Node minimum is a version question, which Linux covers.
- **Audit once.** The lockfile is the same on every runner.
- **Release `verify` trusts the installer workflows.** Any change to installer code runs the matrix on its pull request. `verify` keeps what only it checks: the package builds, and the stage or pack dry run succeeds.

## Test Seams

Agreed with the maintainer on 2026-11-22:
- A contract drift test reads the four workflows and checks the agreed shape:
  - matrix rows
  - one audit
  - path routing
  - push triggers
  - version sync for pull requests into `main` only
  - draft and `main`-head skips
  - the release `verify` steps
- All workflows parse, and flipping any agreed property fails the test (mutation check).
- On this pull request: no jobs while it is a draft; once ready, only the workflows its paths select run, with the 4-job matrix and one audit.

## Risks / Trade-offs

- See the proposal's Impact.
