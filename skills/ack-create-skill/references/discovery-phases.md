# Discovery Phases: ack-create-skill

Question style: Ask the questions with `ack-interview` (`skills/ack-interview/`): look up facts first, ask only about decisions whose prerequisites are settled, and give a recommended answer with each question. Discovery is done when no required field is left open.

## Phase 1: Skill Intent
Define:
- capability provided
- in-scope tasks
- out-of-scope boundaries

## Phase 2: Naming And Location
Define:
- canonical slug
- folder path: `skills/<name>/`
- frontmatter name parity

## Phase 3: Operational Behavior
Define:
- required inputs
- ordered workflow
- expected outputs and acceptance checks
- edge-case handling

## Phase 4: Resource Strategy
Define:
- what belongs in `SKILL.md`
- what moves to `references/`, `scripts/`, `assets/`

## Phase 5: Safety And Policy
Define:
- risky operations and confirmations
- compatibility constraints
- optional `allowed-tools` posture

## Phase 6: Assembly
Produce final artifact and run quality checklist.
