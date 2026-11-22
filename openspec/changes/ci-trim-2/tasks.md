# Tasks

## 1. Workflows

- [x] 1.1 `installer.yml`: 4-job matrix, one audit, installer paths only, draft and `main`-head skips, no `push: main`
- [x] 1.2 `installer-drift.yml`: skills and licenses added, skips, no `push: main`
- [x] 1.3 `version-sync.yml`: pull requests into `main` only, draft skip, no `push: main`
- [x] 1.4 `release.yml`: `verify` builds and dry-runs only; skips

## 2. Checks and records

- [x] 2.1 Contract drift test; mutation check; installer tests; `openspec validate ci-trim-2 --strict`
- [ ] 2.2 Observe on the pull request: no jobs as draft; the selected workflows once ready
- [x] 2.3 `CHANGELOG.md` under [Unreleased] (no skill changed, so no `SKILL.validation.md` re-run)
