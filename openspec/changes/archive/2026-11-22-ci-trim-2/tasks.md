# Tasks

## 1. Workflows

- [x] 1.1 `installer.yml`: 4-job matrix, one audit, installer paths only, draft and `main`-head skips, no `push: main`
- [x] 1.2 `installer-drift.yml`: skills and licenses added, skips, no `push: main`
- [x] 1.3 `version-sync.yml`: pull requests into `main` only, draft skip, no `push: main`
- [x] 1.4 `release.yml`: `verify` builds and dry-runs only; skips

## 2. Checks and records

- [x] 2.1 Contract drift test; mutation check; installer tests; `openspec validate ci-trim-2 --strict`
- [x] 2.2 Observe on the pull request: no jobs as draft (installer, drift and release verify skipped; version sync not started); once ready, drift, the 4-job matrix and release verify ran and passed, version sync did not run
- [x] 2.3 `CHANGELOG.md` under [Unreleased] (no skill changed, so no `SKILL.validation.md` re-run)
