# Design

## Context

The installer workflow fires on pull requests that touch the installer, the skills, the drift-test sources or the license files, and on pushes to `main` and `development`. The version-sync workflow fires on plugin manifests, the changelog and its scripts, and on the same pushes.

## Goals / Non-Goals

**Goals:**
- Run each check once per change, with the smallest job set that covers what changed.

**Non-Goals:**
- Changing the matrix itself; Windows and Node 22.12 have each caught real problems.
- Third-party path-filter actions; two workflows with their own `paths` do the same with first-party features.

## Decisions

- **Two installer workflows instead of one with conditional jobs.** GitHub's `paths` filter works per workflow; splitting keeps both files simple. A pull request that touches both sets runs both, and the drift job then repeats a subset of the matrix, which is cheap.
- **Concurrency key `${{ github.workflow }}-${{ github.ref }}`, cancelling only for pull requests.** A pull request has one ref, so a newer push cancels the older run of the same workflow. `cancel-in-progress` is true only for `pull_request` events: every push to `main` is a release and runs to the end.
- **No push trigger for `development`.** Pull-request CI runs on GitHub's merge ref, which is the merge result at that time.

## Test Seams

- Each workflow file parses as YAML and keeps its job definitions (checked locally).
- On this pull request, which touches `.github/workflows/` and `openspec/`, both installer workflows run. The archive commit, which touches only `openspec/` and `AGENTS.md`, starts only the one drift job.
- `openspec validate ci-trim --strict` passes.

## Risks / Trade-offs

- See the proposal's Impact for the merge-without-rerun trade-off.
