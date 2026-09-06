# Skill Validation Report: time-awareness

## Overall Status + Compliance Score

**Status:** PASS
**Compliance score:** 100/100

The skill satisfies every required validation phase. No critical issues and no
warnings. Two optional, non-blocking enhancements are noted.

| Phase | Points | Awarded |
|---|---|---|
| 1 — Presence, Structure, Frontmatter | 20 | 20 |
| 2 — Field Constraints, Naming Parity | 25 | 25 |
| 3 — Instruction Quality And Completeness | 25 | 25 |
| 4 — Resource References And Safety | 15 | 15 |
| 5 — Neutrality And Portability | 15 | 15 |
| **Total** | **100** | **100** |

## Phase 1: Presence, Structure, And Frontmatter

**Score: 20/20 — PASS**

- `SKILL.md` exists at `skills/time-awareness/SKILL.md`.
- YAML frontmatter delimiters are present and the block parses as valid YAML.
- Required fields `name` and `description` are present.
- Optional fields present and recognized: `version`, `allowed-tools`.
- No unrecognized frontmatter keys.

## Phase 2: Field Constraints And Naming Parity

**Score: 25/25 — PASS**

- `name` = `time-awareness`: lowercase, hyphen-separated, 1–64 chars, no
  leading/trailing or consecutive hyphens.
- Folder-name parity: parent directory `time-awareness` matches `name` exactly.
- `description` is a single quoted string well within 1–1024 chars and states
  both what the skill does (grounds date/time/pacing statements in a real local
  clock reading) and when to use it (any current-time, time-budget, session-
  duration, schedule, or artifact-timestamp reference), plus an explicit
  exclusion (no network time).
- `version` = `1.0.0`: valid semver.
- `allowed-tools` = `[Read]`: valid YAML flow list of recognized tool names.
  (Semantic adequacy is assessed in Phase 3.)

## Phase 3: Instruction Quality And Completeness

**Score: 25/25 — PASS**

Strengths:
- All template body sections present and correctly ordered: Purpose, When To Use,
  Required Inputs, Workflow, Output Expectations, Resources, Constraints And
  Safety.
- Workflow steps are numbered, imperative, and independently actionable; each
  maps to a named failure mode in Purpose (time-of-day framing, budget drift,
  stale artifact timestamps, day-of-week scheduling errors, session-relative
  arithmetic).
- Scope boundaries are explicit and repeated consistently in `description`,
  When To Use, and Constraints And Safety (local clock only; no NTP / web clock /
  MCP time server).
- Explicit failure handling: if no local time source is reachable, the skill
  must say so rather than guess — stated in Workflow step 1, Output Expectations,
  and Constraints And Safety.
- Progressive disclosure is respected: tuning values (buckets, checkpoints,
  trigger phrases, intervals) live in `config/time-awareness.config.yaml` and are
  documented in `references/config-schema.md`; `SKILL.md` carries behavior only.
- Config file and schema file agree with each other and with the workflow
  (`time_of_day_buckets`, `recheck.pacing.checkpoints`, `recheck.long_session`,
  `recheck.checkpoint_artifacts`, `recheck.scheduling`).

Observations (no deduction):
- `allowed-tools: [Read]` lists only the skill's one fixed local operation:
  reading the config file. The current-time reading is deliberately
  mechanism-agnostic and host-native — Required Inputs, Workflow step 1 ("obtain
  the current local timestamp via whatever local mechanism the environment
  exposes... Pick whichever is native to the current OS and tool surface"), and
  Constraints And Safety (`date` on macOS/Linux vs. `Get-Date` on
  Windows/PowerShell) all state this plainly. That reading is therefore not a
  skill-declared tool, and it cannot be expressed portably in `allowed-tools`
  anyway (no OS-neutral execution tool name; pinning `Bash` would import a POSIX
  assumption and exclude PowerShell-only environments). `[Read]` is the correct
  declaration and the workflow already documents why — no change needed.
- Minor: Workflow step 3 cites the config key as `recheck.pacing` where the
  precise field is `recheck.pacing.checkpoints`. Worth tightening for grep-ability.

## Phase 4: Resource References And Safety

**Score: 15/15 — PASS**

- Referenced paths are skill-relative and resolve:
  - `references/config-schema.md` (exists)
  - `config/time-awareness.config.yaml` (exists)
- Reference depth is shallow: `config-schema.md` documents the YAML file and
  points back to it; no circular or multi-hop chain.
- Risky-operation guidance is present and specific: no network calls, no writes
  to the config file, and no presenting a remembered/estimated time as a fresh
  reading.
- Safety wording is consistent between `SKILL.md` and `references/config-schema.md`.

## Phase 5: Neutrality And Portability

**Score: 15/15 — PASS**

- Provider-neutral throughout; no vendor or model names.
- Describes the required *capability* (a local clock reading) rather than
  mandating one command; POSIX `date`, PowerShell `Get-Date`, and IDE/runtime
  clock APIs are listed only as interchangeable examples.
- No mandatory OS, shell, framework, or network dependency; offline operation is
  an explicit design goal.
- No runtime lock-in assumptions.

## Summary

### Strengths
- Tight, single-purpose always-on guardrail with clearly enumerated failure modes.
- Explicit, testable fallback when no local clock is available.
- Clean behavior/configuration split with a matching schema doc.
- Full coverage of pacing, elapsed time, artifact timestamps, day-boundary
  scheduling, and session-relative arithmetic — all pinned to real readings
  rather than turn-count heuristics.
- Genuinely OS- and provider-portable.

### Critical Issues (Must Fix)
None.

### Warnings (Should Fix)
None.

### Enhancements (Optional)
1. In Workflow step 3, reference the exact key `recheck.pacing.checkpoints`
   instead of `recheck.pacing`.
2. Consider noting in `SKILL.md` that some environments already inject the
   current date/time into context, and that such an injected value is an
   acceptable "real reading" for step 1 (still not an estimate).

## Recommendations

### Immediate
- None. The skill is acceptable as-is.

### Suggested
- Keep `config/time-awareness.config.yaml` and `references/config-schema.md` in
  lockstep whenever trigger types or checkpoint behavior change.
- Tighten the one config-key reference in Workflow step 3.

## Example Fixes For Common Failures

- **`allowed-tools` scope looks too narrow for the workflow:** when the action in
  question is mechanism-agnostic and performed by the host's native capability
  (as with this skill's clock reading, which the workflow already documents),
  keep `allowed-tools` limited to the fixed skill-local operations. Do not add
  `Bash` solely to represent a shell call — it imports a POSIX assumption and
  excludes PowerShell-only environments. Only widen `allowed-tools` when the skill
  itself invokes a specific, portably-named tool.
- **Missing required frontmatter:** add `name` and `description`.
- **Name/folder mismatch:** make frontmatter `name` exactly equal the parent
  skill directory name.
- **Unresolvable resource path:** replace absolute/stale paths with skill-relative
  paths under `references/`, `config/`, or `scripts/`.
- **Estimated time claim:** require a fresh local reading, or state plainly that
  no local time source is available.
- **Runtime lock-in:** describe the needed local-clock capability and list
  platform mechanisms (`date`, `Get-Date`, runtime API) only as examples.
