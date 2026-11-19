# Proposal

## Why

The re-run of `AGENTS.validation.md` in rollout step 6 applied the new phase 5 writing checks (`ack-validate-agents-md` 2.1) and found two warnings: the rules about decorative headings and relative paths each have two homes (Documentation Standards and Formatting And Path Stability Rules), and Session Commands still describes the retired `/ack.*` commands, which the changelog already records.

## What Changes

- Documentation Standards keeps only rules that Formatting And Path Stability Rules does not state, and points there for the rest.
- The sentence about the retired `/ack.*` commands is removed from Session Commands.
- `AGENTS.validation.md` is re-run.

Touches: `AGENTS.md`, `AGENTS.validation.md`, `CHANGELOG.md`. Follows ADR-001 and the writing checks in `skills/ack-validate-skill/references/writing-for-agents.md`. No skill, template or spec changes.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. Project context only, so this change sets `skip_specs: true` (see `openspec/config.yaml`).

## Impact

No rule changes meaning; each one keeps exactly one home.
