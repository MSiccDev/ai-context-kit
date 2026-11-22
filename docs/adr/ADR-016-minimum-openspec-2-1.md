# ADR-016: Minimum OpenSpec version 2.1.0, with detection built into the kit

- Status: Accepted
- Date: 2026-11-19
- Source: OpenSpec change `require-openspec-2-1`; supersedes [ADR-002](ADR-002-minimum-openspec-version.md)

## Context

[ADR-002](ADR-002-minimum-openspec-version.md) set OpenSpec 1.13.2 as the minimum. OpenSpec 2.0 then changed how its workflows reach users: it installs skills only (`/openspec-propose` in most tools, `$openspec-propose` in Codex), and `openspec update` deletes the 1.x `/opsx:*` command files. Kit guidance that names one form is wrong for the other major version. Supporting both would mean two sets of instructions in every skill that touches OpenSpec.

Two things can be out of date independently: the CLI on the machine, and the files OpenSpec generated into the repository (1.x marks its generated skills with `metadata.generatedBy`; 2.x recognises its files by fingerprint, and `openspec update --dry-run --json` lists any that differ). A current CLI over old generated files still shows users the old workflow.

## Decision

- The minimum supported OpenSpec version is **2.1.0**.
- The kit detects an old version itself. A model-invoked skill, `ack-openspec-check`, reports the CLI version and whether the generated files match it, and gives the upgrade steps: upgrade the CLI, then run `openspec update` in the repository. It runs nothing that changes the machine or the repository.
- Kit skills that rely on OpenSpec run the check first:
  - A CLI older than 2.1.0 stops them until the user upgrades. Without a CLI the session is in manual mode, which allows planning and AGENTS.md generation but not implementation.
  - Generated files older than the CLI make them show `openspec update` and continue only after the user runs it or says to proceed.
- Newer versions warn, never fail, and the minimum is reviewed every three months, as in ADR-002.

## Consequences

- Kit guidance names only OpenSpec 2.x skills.
- Repositories on OpenSpec 1.x stop at the readiness step and in `ack-create-agents-md`, and `ack-validate-agents-md` reports them as FAIL, until they upgrade.
- `openspec update` can replace the copies in `.claude/skills/` with symlinks to `.agents/skills/`, which needs git symlink support on Windows.
- The installer's `doctor` command (Part 3) reuses the same rule and constant.
