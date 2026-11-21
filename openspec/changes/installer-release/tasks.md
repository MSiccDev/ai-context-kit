# Tasks

## 1. Publishing

- [x] 1.1 `.github/workflows/release.yml` with `verify` and `publish`
- [x] 1.2 `installer/package.json` `prepack`; `installer/RELEASING.md`
- [x] 1.3 Drift tests for the release workflow and `repository.url`

## 2. Version sync

- [x] 2.1 `scripts/check-version-sync.sh` checks the installer's `package.json` and lockfile; tests updated

## 3. Docs and records

- [x] 3.1 README: canonical install block in Quick Start; template-repository section replaced
- [x] 3.2 `npm publish --dry-run` and `npm pack --dry-run`; installer tests and version-sync tests pass; `openspec validate installer-release --strict`
- [x] 3.3 Plan Part 3 step 6; `CHANGELOG.md` under [Unreleased] (no skill changed, so no `SKILL.validation.md` re-run)
