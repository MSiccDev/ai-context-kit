# Proposal

## Why

The maintainer is concluding 2.0 before planning 2.1 (2026-11-24). The adoption plan still lists the dogfood run and the release as open (Part 2 rollout step 6), and Part 3 step 6 does not mention staged publishing.

## What Changes

- `docs/plans/2.0-adoption-plan.md`, Part 2 step 6:
  - 2.0.0 released 2026-11-22 (#105), 2.0.1 hotfix (#107)
  - TwistReader onboarded with Claude Code and SmartMealWeek with Codex, both from 1.x setups
  - the readiness gate checked in SmartMealWeek
  - no full feature run through the loop in the MAUI project; the maintainer left it for the next feature work
  - the symbolic-link finding filed as #111
- Part 3 step 6: the first version published by hand; staged publishing from 2.0.1.
- `CHANGELOG.md` entry under [Unreleased].

Touches no skill, template, spec section or ADR.

## Capabilities

### New Capabilities

None as OpenSpec capability specs (see `openspec/config.yaml`); this change sets `skip_specs: true`.

### Modified Capabilities

None.

## Impact

- The plan reads as closed for 2.0. The one open item it names, the full loop run, belongs to the next feature work.
