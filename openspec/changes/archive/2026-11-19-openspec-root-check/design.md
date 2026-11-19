# Design

## Context

OpenSpec resolves its root by searching upward for an `openspec/` folder and reports the directory that holds it as `root.path`. The kit's `AGENTS.md` names the folder where changes live, which readers and the template expect to be `openspec/`.

## Goals / Non-Goals

**Goals:**
- One definition of the stated root, used by the creator and the validator.
- The kit's `AGENTS.md`, which states `openspec/`, passes phase 3.

**Non-Goals:**
- Supporting OpenSpec stores (`--store`) or a root outside the repository.
- Changing the severity of a real mismatch.

## Decisions

- **The stated root is the folder, not its parent.** It matches the template's placeholder and what a reader opens. Alternative: state `root.path` itself (`.`); rejected because "OpenSpec root: `.`" tells a reader nothing.
- **Compare resolved paths.** The validator resolves the stated root against the repository and compares it with `root.path` joined with `openspec/`, so `openspec` and `openspec/` both match.

## Test Seams

- `AGENTS.validation.md`, re-run with `ack-validate-agents-md` against `openspec list --json`: no critical finding in phase 3.
- `skills/ack-create-agents-md/SKILL.validation.md` and `skills/ack-validate-agents-md/SKILL.validation.md`, re-run: no warnings.
- A repository-wide scan for `root.path` finds no wording that still means "write `root.path` as the root".
- `openspec validate openspec-root-check --strict` passes before the change is archived.

## Risks / Trade-offs

- `AGENTS.md` files that followed the 2.0.0 creator literally state `.` and will now fail. Both creator versions shipped only in this unreleased 2.0 cycle, so few files are affected; `CHANGELOG.md` names the fix.
