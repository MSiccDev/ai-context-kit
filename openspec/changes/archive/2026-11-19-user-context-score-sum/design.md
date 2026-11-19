# Design

## Context

`ack-validate-user-context` scores five phases (10, 30, 30, 15, 15). Since rollout step 5 its `references/scoring.md` lists critical findings and fixed warning costs, but its reports give only a total. `ack-validate-skill` and `ack-validate-agents-md` put a score on every phase and state the sum next to the total.

## Goals / Non-Goals

**Goals:**
- Every user-context report states each phase's score and a total that equals their sum.
- The rule reads the same way in all three validators.

**Non-Goals:**
- Changing the point model, grade bands or critical findings.
- Re-running user-context files other than the repository's sample.

## Decisions

- **Same wording as the other validators.** `references/scoring.md` gets the sentence `ack-validate-skill` uses ("The phase scores must add up to the reported total. State the sum in the report") with a user-context example. Alternative: a shared scoring reference for all validators; rejected for now because the three point models differ and a shared file would add a cross-skill dependency.
- **Workflow step 3 carries the rule**, as in the other validators, so it is visible without opening the reference.
- **Report contract:** each phase section states `Score: n/max`, and the overall section states the sum.

## Test Seams

Agreed with the user before tasks were written:
- `usercontexts/sample_usercontext.validation.md`, re-run: its phase scores add up to its total.
- `skills/ack-validate-user-context/SKILL.validation.md`, re-run with `ack-validate-skill`: no warnings.
- A repository-wide scan finds no other user-context report that needs a re-run.
- `openspec validate user-context-score-sum --strict` passes before the change is archived.

## Risks / Trade-offs

- Existing user-context reports elsewhere lack the sum until re-run. They stay readable; the change notes this in `CHANGELOG.md`.
