# Skill Validation Report

**File:** skills/ack-openspec-check/SKILL.md
**Skill:** ack-openspec-check
**Validated:** 2026-11-21 (re-run for OpenSpec change `prerelease-cleanup`, version 1.1.0)
**Validator:** `skills/ack-validate-skill`

---

## Overall Status: PASS

**Compliance Score:** 99/100 (Phase 1 20 + Phase 2 25 + Phase 3 25 + Phase 4 15 + Phase 5 14)

---

## Phase 1: Presence, Structure, And Frontmatter
**Score:** 20/20 · **Status:** PASS

### Findings:
- `SKILL.md` exists with valid YAML frontmatter.
- Required fields `name` and `description` are present; every other key is a recognized optional field.

---

## Phase 2: Field Constraints And Naming Parity
**Score:** 25/25 · **Status:** PASS

### Findings:
- `name` (18 characters) matches the folder and meets the format rules.
- `description` (289 characters): says what the skill does, then lists its triggers for the model (model-invoked).
- `version` is `1.0.0`; `metadata` values are strings.
- `metadata.invocation` is `"model"`, and `disable-model-invocation` is absent.
- No user-invoked skill is started by this skill.

---

## Phase 3: Instruction Quality And Completeness
**Score:** 25/25 · **Status:** PASS

### Findings:
- All seven required body sections are present, in order; the version rule, classification tables and upgrade steps live in `references/upgrade.md`.
- Every workflow step ends on a completion criterion: a version or a missing command, a status, a file classification, a status line.
- No no-ops or sediment. The status contract for callers is stated once, in Output Expectations; each caller adds only its own handling (for example manual mode in `ack-create-agents-md`).
- Enhancement: "Never use sudo or edit shell profiles" is a prohibition without a positive target; it is a hard guardrail, so it stays.
- The fallback never certifies files it cannot check: with no 1.x markers it reports `UNVERIFIED`, which callers treat like `UPDATE_FILES` (added after Codex review).
- New in 1.1.0: after an install or upgrade, the upgrade steps name both telemetry opt-outs and ask whether to keep telemetry on (spec section 11.8). The skill still changes nothing itself; the user runs the command.

---

## Phase 4: Resource References And Safety
**Score:** 15/15 · **Status:** PASS

### Findings:
- `references/upgrade.md` resolves. The ADR-016 link resolves in the kit repository; plugin installs, which ship only `skills/`, do not need it, because the reference carries the whole rule.
- Read-only: the skill runs only `openspec --version`, `openspec version --json` and `openspec update --dry-run --json`, and leaves installing, upgrading and `openspec update` to the user.

---

## Phase 5: Neutrality And Portability
**Score:** 14/15 · **Status:** PASS

### Findings:
- Provider-neutral wording; the upgrade steps name npm first and defer to the reported package manager otherwise.
- One point deducted: the check needs a shell that can run the OpenSpec CLI. Without one it reports `NO_CLI`, and callers fall back to manual mode as spec section 11.5 prescribes.

---

## Summary

### Strengths:
- Detects both an old CLI and stale generated files, verified in three scratch repositories (2.1.0 fresh: `OK`; 1.13.2 files under 2.1.0: `UPDATE_FILES`, 25 changes including 6 `/opsx` deletes; 1.13.2 CLI: `UPGRADE_CLI`).
- One status line that every caller acts on.

### Critical Issues (Must Fix):
- None.

### Warnings (Should Fix):
- None.

### Enhancements (Optional):
- None. (The telemetry question from spec section 11.8 was added in 1.1.0.)

---

## Recommendations

### Immediate Actions:
1. None.

### Suggested Improvements:
1. Re-validate at each quarterly review of the minimum version (ADR-016).
