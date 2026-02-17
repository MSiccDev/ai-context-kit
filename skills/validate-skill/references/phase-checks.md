# Phase Checks: validate-skill

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
- `description` quality constraints
- optional field constraints (`compatibility`, `metadata`, `allowed-tools`)

## Phase 3: Instruction Quality And Completeness
Check:
- operational guidance is clear and actionable
- required body sections exist
- scope boundaries are explicit
- progressive disclosure is respected

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
