# Tasks

## 1. Validator rule

- [x] 1.1 Add the sum rule and a user-context example to `skills/ack-validate-user-context/references/scoring.md`
- [x] 1.2 Require a score per phase section and the sum in the overall section in `skills/ack-validate-user-context/references/report-contract.md`
- [x] 1.3 State the sum rule in workflow step 3 of `skills/ack-validate-user-context/SKILL.md` and bump it to 1.2.0

## 2. Reports and records

- [x] 2.1 Re-run `usercontexts/sample_usercontext.validation.md`; its phase scores add up to its total
- [x] 2.2 Re-run `skills/ack-validate-user-context/SKILL.validation.md` with `ack-validate-skill`; no warnings
- [x] 2.3 Scan the repository for other user-context reports; none needs a re-run
- [x] 2.4 Add the change to `CHANGELOG.md` under [Unreleased]
- [x] 2.5 `openspec validate user-context-score-sum --strict` passes
