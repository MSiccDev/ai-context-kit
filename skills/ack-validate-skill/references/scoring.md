# Scoring: ack-validate-skill

## Point model (100)
- Phase 1: Presence, Structure, Frontmatter: 20
- Phase 2: Field Constraints, Naming Parity: 25
- Phase 3: Instruction Quality And Completeness: 25
- Phase 4: Resource References And Safety: 15
- Phase 5: Neutrality And Portability: 15

The phase scores must add up to the reported total. State the sum in the report, for example `97/100 (Phase 1 20 + Phase 2 25 + Phase 3 23 + Phase 4 15 + Phase 5 14)`.

## Grade bands
- 90-100: PASS
- 75-89: PASS WITH WARNINGS
- 60-74: PASS WITH WARNINGS (Needs Improvement)
- <60: FAIL

## Critical findings
Each critical finding makes the status FAIL, whatever the score:
- `SKILL.md` or its frontmatter is missing or invalid.
- `name` or `description` is missing.
- `name` does not match the folder.
- A referenced path does not resolve.

## Scoring rules
- A critical finding takes its phase to 0.
- Each warning costs 1 to 3 points in its phase: 1 when it affects one place, 2 when it affects several, 3 when it affects most of the skill.
- Enhancements cost nothing.
- Schema or naming violations are never downgraded to advisory-only findings.
