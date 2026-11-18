# Phase Checks: ack-validate-skill

Execute these phases in order.

## Phase 1: Presence, Structure, Frontmatter
Check:
- `SKILL.md` exists
- YAML frontmatter is valid
- required fields exist (`name`, `description`)
- optional fields are recognized

## Phase 2: Field Constraints And Naming Parity
Check:
- `name` format constraints
- folder-name parity
- `description` quality constraints, read as a pointer (`writing-for-agents.md`): a model-invoked skill lists its triggers; a user-invoked skill gives a one-line summary
- optional field constraints (`version`, `compatibility`, `metadata`, `allowed-tools`)
- invocation: `metadata.invocation` is present and is `"user"` or `"model"` (missing or other value: warning)
- invocation parity: `disable-model-invocation: true` is present when `metadata.invocation` is `"user"`, and absent when it is `"model"` (mismatch: warning)
- no user-invoked skill is started by another skill's workflow (violation: warning)
- attribution: a skill that says it adapts external material has a `metadata.credits` entry and a row in `THIRD_PARTY_NOTICES.md` (missing: warning)

## Phase 3: Instruction Quality And Completeness
Check:
- operational guidance is clear and actionable
- required body sections exist
- scope boundaries are explicit
- progressive disclosure is respected
- every workflow step has a completion criterion (`writing-for-agents.md`; missing: warning)
- no no-ops, sediment or duplicated rules (`writing-for-agents.md`; found: warning)
- prohibitions outside the scope boundaries are paired with a positive target (`writing-for-agents.md`; bare prohibition: enhancement)

## Phase 4: Resource References And Safety
Check:
- reference paths are relative/resolvable
- no deep/circular reference chains
- safety guidance exists for risky operations

## Phase 5: Neutrality And Portability
Check:
- provider-neutral wording
- runtime portability
- no mandatory runtime lock-in assumptions
