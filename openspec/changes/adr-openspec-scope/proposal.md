# Proposal

## Why

The maintainer asked before `release/2.0.0` whether OpenSpec should be optional for some kinds of repositories (discussion of 2026-11-21). Documentation, content and skill or prompt libraries have no system for a spec to describe, yet spec section 11.1 and ADR-001 require OpenSpec in every kit repository. The decision is to require OpenSpec only where the implementation loop runs, and to build that in 2.1.

## What Changes

- New `docs/adr/ADR-019-openspec-required-for-the-loop.md`: OpenSpec is required for the implementation loop, not for every kit repository; a repository may declare "Spec-driven workflow: not used"; the loop skills then stop; implementation is planned for 2.1.
- `docs/adr/README.md` index lists ADR-019; ADR-001 gets a status note that ADR-019 narrows its scope from 2.1, with its decision text unchanged.
- ADR-015 names the change as a 2.1 item; `CHANGELOG.md` notes the decision.

No skill, template, spec section or installer code changes in this change; the 2.1 change implements ADR-019.

## Capabilities

### New Capabilities

None as OpenSpec capability specs (see `openspec/config.yaml`); this change sets `skip_specs: true`.

### Modified Capabilities

None.

## Impact

- 2.0.0 behaviour is unchanged: OpenSpec stays mandatory.
