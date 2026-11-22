# Design

## Context

After `init`, `AGENTS.md` holds only the installer's marker block, OpenSpec may or may not be set up (`init` stops when the CLI is missing or older than 2.1.0), and the user's personal context is unknown to the repository. The kit already has a skill for each of these: `ack-create-agents-md`, `ack-openspec-check`, `ack-create-user-context`.

## Goals / Non-Goals

**Goals:**
- One entry point after `init` that tells the user which skills to run, in which order, and why.
- An `install.md` an agent can follow from a pasted link, with the same consent rules OpenSpec's `install.md` sets.

**Non-Goals:**
- Writing `AGENTS.md` content in `ack-setup` (maintainer's decision, 2026-11-21: orchestrate only).
- Per-tool user-level instruction paths (maintainer's decision, 2026-11-21: ask, don't assert).
- Making OpenSpec optional for some repositories; the maintainer wants to discuss that before the release, as a separate decision.
- Publishing (step 6).

## Decisions

- **`ack-setup` is user-invoked and orchestrates.** The skill template says a user-invoked skill is never started by another skill. `ack-setup` therefore runs only the model-invoked `ack-openspec-check` itself and ends with the user-invoked skills to run next, with their spelling per installed tool from the manifest.
- **Explore before asking.** It reads `.ai-context-kit/manifest.json`, `AGENTS.md` (kit block only, or a full kit file), `CLAUDE.md`, `openspec/`, `docs/adr/` and the git remote, then asks one area at a time with a recommended answer.
- **`install.md` lives at the repository root**, as plan Part 3 says, and is read from GitHub; it is not part of the npm package.
- **OpenSpec before `init` in `install.md`.** `init` stops when the CLI is missing; checking first avoids a half-finished run. Telemetry is asked and passed as `--openspec-telemetry`, because an agent's shell is not interactive and `init` would otherwise default to off without asking.

## Test Seams

Agreed with the maintainer on 2026-11-21:
- `skills/ack-setup/SKILL.validation.md` from `ack-validate-skill`, PASS at 90 or more; `ack-guide`'s report re-run after its new route.
- Drift tests in `installer/test/drift.test.ts`: `install.md` names the Node minimum, the package and bin names, every registry tool id with its invocation spelling, and `ack-setup`; `ack-setup` is bundled and gets a Codex sidecar with implicit invocation off.
- Repository-wide path scan: every path in the new files resolves; skill lists include `ack-setup`.
- Dry run of `install.md` in a temporary repository against `npm pack` output, recorded in the pull request.

## Risks / Trade-offs

- `install.md` is prose for agents, so results vary by model (ADR-013); the drift tests keep its facts current, not its behaviour.
