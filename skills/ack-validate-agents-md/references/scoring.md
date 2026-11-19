# Scoring: ack-validate-agents-md

## Point model (100 per mode)

| Phase | Root | Nested |
| --- | --- | --- |
| 1. Structure And Core Sections | 15 | 20 |
| 2. Operational Contract | 25 | 15 |
| 3. Spec-Driven Workflow | 10 | 0 |
| 4. Project Context | 20 | 15 |
| 5. Clarity And Conciseness | 15 | 25 |
| 6. Portability, Links And Alignment | 15 | 25 |

The phase scores must add up to the reported total. State the sum in the report, for example `92/100 (14 + 25 + 8 + 20 + 12 + 13)`.

## Grade bands
- 90-100: PASS
- 75-89: PASS WITH WARNINGS
- 60-74: PASS WITH WARNINGS (Needs Improvement)
- <60: FAIL

## Critical findings
Each critical finding makes the status FAIL, whatever the score:
- Root mode: the session-state contract or the Session Commands section is missing.
- Root mode: the `Spec-Driven Change Workflow` section is missing.
- Root mode: the repository has no OpenSpec root (spec section 11.1).
- Root mode: the stated OpenSpec root is not the `openspec/` folder under `root.path`.
- Root mode: the OpenSpec CLI is older than 2.1.0 (`ack-openspec-check` reports `UPGRADE_CLI`; spec section 11.6).
- A relative link or referenced path does not resolve.
- Nested mode: no root `AGENTS.md` exists.
- Nested mode: the file contradicts the root file without stating it as an override.

## Phase 3 severities (root mode)
| Check | Severity |
| --- | --- |
| Section missing | Critical |
| No OpenSpec root | Critical |
| Stated root is not the `openspec/` folder under `root.path` | Critical |
| CLI older than 2.1.0 (`UPGRADE_CLI`) | Critical |
| Generated OpenSpec files older than the CLI, or not confirmable (`UPDATE_FILES`, `UNVERIFIED`) | Warning |
| Active change is neither `none` nor an id in the list, or is `none` while exactly one change is active | Warning |
| Minimum version is not `2.1.0` | Warning |
| No Change, No Code rules incomplete | Warning |
| `openspec/config.yaml` `context` does not point to `AGENTS.md` | Warning |
| Invoking OpenSpec rows name 1.x `/opsx:*` commands | Warning |
| Invoking OpenSpec table empty | Enhancement |

## Scoring rules
- Deduct within a phase for each failed check, in proportion to its weight. A critical finding takes the phase to 0.
- Missing operational safeguards and missing project-context subsections cost heavily.
- Broken links or path mismatches are always reflected in phase 6.
- Phase 5 writing findings are warnings (a bare prohibition is an enhancement) and cost 1 to 3 points each: 1 for one place, 2 for several, 3 for most of the file.
