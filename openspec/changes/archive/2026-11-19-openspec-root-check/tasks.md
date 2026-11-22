# Tasks

## 1. One definition of the root

- [x] 1.1 `ack-create-agents-md` 2.0.1: discovery phase 6 and `references/root-schema.md` state the root as `root.path` plus `openspec/`, relative to the repository
- [x] 1.2 `ack-validate-agents-md` 2.1.1: phase 3 resolves the stated root against the repository and compares it with `root.path` plus `openspec/`; `references/scoring.md` uses the same wording
- [x] 1.3 `templates/AGENTS_template.md`: the root placeholder reads `<OpenSpec folder, usually openspec/>`

## 2. Reports and records

- [x] 2.1 Re-run `AGENTS.validation.md` against `openspec list --json`; no critical finding in phase 3
- [x] 2.2 Re-run both skills' `SKILL.validation.md`; no warnings
- [x] 2.3 Scan the repository for `root.path`; no wording still writes it as the root
- [x] 2.4 Add the change to `CHANGELOG.md` under [Unreleased]
- [x] 2.5 `openspec validate openspec-root-check --strict` passes
