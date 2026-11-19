# Design

## Context

Checked with OpenSpec 1.13.2 and 2.1.0 in a scratch repository on 2026-11-19:
- `openspec --version` prints the version on both majors; `openspec version --json` exists only on 2.x.
- OpenSpec 1.x records its generator in each generated `openspec-*` skill (`metadata.generatedBy: "1.13.2"`) and writes `.claude/commands/opsx/*.md`. OpenSpec 2.1.0 writes neither; it recognises its own files by fingerprint.
- `openspec update --dry-run --json` (2.x) lists each file an update would add, change or delete; an empty `changes` list means the generated files match the CLI.
- Upgrading is two steps: upgrade the CLI (`npm install -g @fission-ai/openspec@latest` for an npm install), then `openspec update` in the repository. With 2.1.0 the update rewrote the skills, deleted the six `/opsx` command files, and replaced the copies in `.claude/skills/` with symlinks to `.agents/skills/`.

## Goals / Non-Goals

**Goals:**
- One home for the version rule and the upgrade guidance, available wherever kit skills are installed (including the plugin, which ships only `skills/`).
- Every kit skill that relies on OpenSpec detects an old CLI or stale generated files before it acts.

**Non-Goals:**
- Installing or upgrading OpenSpec automatically; the skill reports and the user runs the commands.
- The telemetry question (spec section 11.8); a separate change adds it, and this skill is its natural home.
- The installer's `doctor` command (Part 3), which will reuse the same rule.

## Decisions

- **A model-invoked skill, `ack-openspec-check`.** Other skills start it by name; the assistant may start it on its own when an OpenSpec command fails; users can run it too. Alternatives: a reference file inside one skill (other skills would reach into a sibling's folder) or spec section 11.6 alone (plugin users don't get the spec). The skill is read-only: it runs only `openspec --version`, `openspec version --json` and `openspec update --dry-run --json`.
- **Two checks, two severities.** CLI older than 2.1.0 (or missing): the calling skill stops; manual mode (spec section 11.5) still allows planning. Generated files older than the CLI: the calling skill shows `openspec update` and continues only after the user runs it or says to proceed. `ack-validate-agents-md` maps these to a critical finding and a warning.
- **Stale-file detection prefers the CLI.** With a 2.x CLI, a non-empty `openspec update --dry-run --json` is the signal. The fallback, when the dry run fails, treats any `metadata.generatedBy` field (written only by 1.x) or a `.claude/commands/opsx/` folder as stale files. Found while exercising the check: 2.1.0 no longer writes `generatedBy`. Without either marker the fallback reports `UNVERIFIED`, never `OK`, and callers treat it like `UPDATE_FILES` (Codex review on the pull request).
- **Newer versions warn, never fail** (unchanged from ADR-002): a CLI newer than the tested version continues with a note.
- **Upgrade guidance is concrete but package-manager aware.** npm is shown first because it is OpenSpec's documented install; for other installs the skill names `openspec version --json`'s `install.packageManager` and points to OpenSpec's installation docs. No sudo, no shell-profile edits, and nothing runs without the user.
- **ADR-016 supersedes ADR-002.** ADR-002's quarterly review and "warn, never fail" carry over; only the minimum and the detection change.

## Test Seams

Agreed with the user before tasks were written:
- `ack-openspec-check`, exercised by hand in scratch repositories: OpenSpec 2.1.0 with fresh files reports OK; a 1.13.2-initialised repository under a 2.1.0 CLI reports stale files with `openspec update`; the 1.13.2 CLI reports an upgrade.
- `skills/ack-openspec-check/SKILL.validation.md` and the re-run reports of the four calling skills: no warnings.
- `AGENTS.validation.md`, re-run: phase 3 passes with minimum `2.1.0`.
- A repository-wide scan finds no `1.13.2` minimum and no `/opsx:` outside history (CHANGELOG, plans, archived changes, ADR-002).
- `openspec validate require-openspec-2-1 --strict` passes before archive.

## Risks / Trade-offs

- Users on 1.x are blocked until they upgrade. That is the intent; the skill gives the exact steps.
- The dry-run JSON shape is OpenSpec's, not the kit's; the fallback keeps the check working if it changes.
