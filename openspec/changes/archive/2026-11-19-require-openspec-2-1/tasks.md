# Tasks

## 1. Decision and rule

- [x] 1.1 Add ADR-016 (minimum OpenSpec 2.1.0, detection built in), mark ADR-002 superseded, update `docs/adr/README.md`
- [x] 1.2 Spec section 11.6: minimum 2.1.0, the two detection checks and their outcomes
- [x] 1.3 `templates/AGENTS_template.md` and `AGENTS.md`: minimum OpenSpec version `2.1.0`

## 2. The check skill

- [x] 2.1 Create `skills/ack-openspec-check/` (SKILL.md, `references/upgrade.md`), model-invoked, read-only
- [x] 2.2 Add the `.agents/skills/ack-openspec-check` link and list the skill in `README.md` (both tables) and `skills/README.md`

## 3. Callers

- [x] 3.1 `ack-loop-01-readiness`: section 1 of the procedure runs `ack-openspec-check`; minimum 2.1.0
- [x] 3.2 `ack-create-agents-md`: discovery phase 6 runs the check first; root schema minimum 2.1.0
- [x] 3.3 `ack-validate-agents-md`: phase 3 runs the check; CLI older than 2.1.0 is critical, stale files a warning, stated minimum must be 2.1.0
- [x] 3.4 `ack-guide`: run the check before recommending `openspec-*` skills; routes name 2.x skills, not `/opsx:*`

## 4. Verification and records

- [x] 4.1 Exercise the check in three scratch repositories (2.1.0 fresh, 1.13.2 files under a 2.1.0 CLI, 1.13.2 CLI)
- [x] 4.2 Write `skills/ack-openspec-check/SKILL.validation.md` and re-run the four callers' reports; no warnings
- [x] 4.3 Re-run `AGENTS.validation.md`; phase 3 passes with minimum 2.1.0
- [x] 4.4 Scan for `1.13.2` minimums and `/opsx:` outside history; none left
- [x] 4.5 Add the change to `CHANGELOG.md` under [Unreleased]
- [x] 4.6 `openspec validate require-openspec-2-1 --strict` passes
