# Design

## Context

Hotfix branch `hotfix/2.0.1` from `main` (`35a3153`), per the branch flow in `AGENTS.md`. The route (merge 2.0.0 as published, then hotfix) and the namespaced file names are the maintainer's decisions of 2026-11-22.

## Goals / Non-Goals

**Goals:**
- Fix both findings, and make the next npm release go through staging.

**Non-Goals:**
- Any other change; ADR-019's 2.1 work.

## Decisions

- **Notices per skills folder, managed.** They are written once per folder, not per skill. They are recorded in the manifest, so `update` refreshes them and keeps edited copies like any managed file.
- **Namespaced names.** Skills folders are shared with OpenSpec and other kits. A plain `LICENSE` there would collide with another kit's.
- **Stage in both jobs.** `verify` runs `npm stage publish --dry-run` for a new version, so the pull request proves the same command `publish` runs.

## Test Seams

Agreed with the maintainer on 2026-11-22:
- Installer tests:
  - `init` writes both notice files once per skills folder for every tool, byte-identical (LF) to the bundled files, and records them in the manifest.
  - `update` keeps an edited notice and writes a conflict copy.
  - A drift test ties ADR-014 to the names `plan()` writes.
- `ack-loop-03-review`'s `SKILL.validation.md` re-run, PASS at 90 or more.
- Release-workflow drift tests:
  - `npm stage publish` in both jobs, and no plain `npm publish` step.
  - npm 11.15.0 or later.
- `scripts/check-version-sync.sh` at 2.0.1; `npm stage publish --dry-run` and `npm pack --dry-run` show the same top-level entries as 2.0.0.

## Risks / Trade-offs

- A failed approval or an expired trusted publisher leaves 2.0.1 unpublished; `RELEASING.md` covers the recovery.
