# Tasks

## 1. OpenSpec module

- [x] 1.1 `Io` gains `exec`, `ask` and `env`; `openspec.ts` runs the CLI without a shell (a shell only on Windows, for `.cmd` shims) and sets `OPENSPEC_TELEMETRY=0` until telemetry is answered
- [x] 1.2 Version check (missing, old, current, newer) with install guidance; Node 22.12 check before OpenSpec

## 2. init

- [x] 2.1 Telemetry question: interactive, `--openspec-telemetry on|off`, default off, stored in the manifest
- [x] 2.2 No root: `openspec init --tools <same ids>`; existing root: dry run only, stale files reported, `openspec update` never run
- [x] 2.3 `openspec/config.yaml` managed block when `context` and `rules` are absent; untouched otherwise; refreshed by `update`
- [x] 2.4 Verify with `openspec list --json`; record the OpenSpec version in the manifest; exit 1 with next steps when OpenSpec is missing or old

## 3. doctor

- [x] 3.1 Report a missing or old CLI, a missing root and stale generated files

## 4. End to end, CI and records

- [x] 4.1 End-to-end test with the real OpenSpec 2.1.0 CLI (dev dependency) on Linux, macOS and Windows
- [x] 4.2 `installer/README.md` and `CHANGELOG.md`
- [x] 4.3 `npm audit` reports 0; `openspec validate installer-openspec --strict` passes
