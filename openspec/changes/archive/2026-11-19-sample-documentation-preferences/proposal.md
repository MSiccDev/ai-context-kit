# Proposal

## Why

The re-run in change `user-context-score-sum` found that `usercontexts/sample_usercontext.instructions.md` lacks **Documentation Preferences**, one of the fifteen sections the user-context template and `ack-create-user-context` require. The sample is the kit's reference example, so it should pass its own validator in full.

## What Changes

- Add `## Documentation Preferences` between Quality Standards and Communication Style, with content that fits the sample persona and agrees with its Format Preferences and JSON metadata.
- Re-run `usercontexts/sample_usercontext.validation.md`.

Touches: `usercontexts/`, `CHANGELOG.md`. Follows ADR-001. No skill, template or spec changes.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. Sample content only, so this change sets `skip_specs: true` (see `openspec/config.yaml`).

## Impact

The sample now matches the template section for section. Nothing else depends on its content.
