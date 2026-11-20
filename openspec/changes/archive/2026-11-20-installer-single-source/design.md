# Design

## Context

AGENTS.md's precedence puts templates above skills and samples; a template is the canonical home for a structure the kit writes into users' repositories. The installer has no runtime dependencies and bundles `skills/ack-*` at build time.

## Goals / Non-Goals

**Goals:**
- Every kit fact the installer depends on has one home, and a test fails when the installer disagrees with it.
- The seeded `config.yaml` prose lives only in `templates/`.

**Non-Goals:**
- Parsing Markdown at runtime; the installer keeps typed constants, and the tests hold them to the sources.
- The kit repository's own `openspec/config.yaml`, which carries kit-specific context and rules of its own.

## Decisions

- **Constants plus drift tests, not runtime parsing.** Reading spec or ADR prose at runtime would make the installer depend on Markdown wording. Constants stay typed and fast; the drift tests read the sources and compare. Alternative considered: generate a constants module at build time from the sources; rejected because it moves the same parsing into the build without adding a check.
- **Template bundled like the skills.** `bundle-skills.mjs` copies `templates/openspec_config_block.yaml` to `installer/templates/`; `bundle.ts` loads it; the package ships it.
- **Tests read, never restate.** A test that needs a kit fact imports the constant (held by the drift tests) or reads the source file.

## Test Seams

Agreed with the maintainer on 2026-11-20 (plan A, B and C):
- `drift.test.ts`: one test per fact and per home; each reads the source file and compares with the installer's constant or registry.
- The `config.yaml` tests compare the seeded block with `templates/openspec_config_block.yaml`.
- Mutation check by hand: changing a source value (for example the minimum in `upgrade.md`) makes the suite fail, then reverting makes it pass.
- `npm audit` stays at 0; `openspec validate installer-single-source --strict` passes.

## Risks / Trade-offs

- Drift tests depend on how the sources phrase a fact (for example `**2.1.0**` in spec section 11.6). A rewording fails the test, which is the point: the fact must then be re-checked.
