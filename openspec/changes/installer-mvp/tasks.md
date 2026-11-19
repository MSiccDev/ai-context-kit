# Tasks

## 1. Package scaffold

- [x] 1.1 `installer/package.json`, `tsconfig.json`, Vitest config, `.gitignore` entries; `npm run build` compiles to `dist/` and bundles `skills/ack-*` without validation reports
- [x] 1.2 `run(argv, { cwd })` entry with `parseArgs`, `--help`, usage errors (exit 2), and the `tools` command over the ADR-017 registry

## 2. init

- [x] 2.1 Detection and `--tools` (`all`, `none`, ids); stop when nothing is detected
- [x] 2.2 Copy skills per folder with the `generatedBy` line; one copy per shared folder; golden file lists and parity tests
- [x] 2.3 Codex sidecars for user-invoked skills
- [x] 2.4 Marker blocks in `AGENTS.md` and `CLAUDE.md`; manifest with hashes; second `init` changes nothing

## 3. update

- [x] 3.1 Unedited files refreshed, edited files get `.ai-context-kit-new`, deleted files stay deleted, `--force`
- [x] 3.2 Marker blocks refreshed without touching outside text; skills added to or dropped from the bundle

## 4. doctor

- [x] 4.1 Node version, missing and edited files, missing marker blocks, stale skills; `--json`; exit 1 on problems

## 5. CI and records

- [x] 5.1 `.github/workflows/installer.yml`: build and test on Linux, macOS and Windows for pull requests touching `installer/` or `skills/`
- [x] 5.2 Add the change to `CHANGELOG.md` under [Unreleased]
- [x] 5.3 `openspec validate installer-mvp --strict` passes
