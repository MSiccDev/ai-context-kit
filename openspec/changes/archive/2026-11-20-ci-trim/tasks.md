# Tasks

## 1. Workflows

- [x] 1.1 `installer.yml`: matrix only for installer, skills and license changes; concurrency; no `push: development`
- [x] 1.2 New `installer-drift.yml`: one Linux job for spec, ADR, template and OpenSpec changes; concurrency; no `push: development`
- [x] 1.3 `version-sync.yml`: concurrency; no `push: development`

## 2. Records

- [x] 2.1 `CHANGELOG.md` under [Unreleased]
- [x] 2.2 Workflow files parse; `openspec validate ci-trim --strict` passes
