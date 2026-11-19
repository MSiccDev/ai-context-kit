# Proposal

## Why

`ack-validate-skill` and `ack-validate-agents-md` require the phase scores in a report to add up to the reported total, and state the sum. `ack-validate-user-context` does not, so a user-context report can show a total that its phases do not explain. The step 5 re-run of `skills/ack-validate-user-context/SKILL.validation.md` listed this as its one open enhancement. It is also the kit repository's first change through OpenSpec (2.0 adoption plan, rollout step 6).

## What Changes

- `ack-validate-user-context` (skill and `references/scoring.md`, `references/report-contract.md`): each phase states its score; the phase scores must add up to the total, and the report states the sum, as in the other two validators.
- `usercontexts/sample_usercontext.validation.md` is re-run in that format.
- `skills/ack-validate-user-context/SKILL.validation.md` is re-run.

Touches: `skills/ack-validate-user-context/`, `usercontexts/sample_usercontext.validation.md`, `CHANGELOG.md`. Follows ADR-001 (OpenSpec is mandatory). No spec section changes: the spec names validation report files (section 10.5) but not their score format.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. The kit keeps its behavior in `specs/context_aware_ai_session_spec.md` rather than in OpenSpec capability specs (see `openspec/config.yaml`), so this change sets `skip_specs: true`.

## Impact

User-context reports written before this change stay valid; they lack the per-phase scores and the sum until they are re-run. No templates or other skills change.
