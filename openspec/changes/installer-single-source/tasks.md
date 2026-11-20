# Tasks

## 1. Template

- [x] 1.1 `templates/openspec_config_block.yaml` with the seeded `context` and `rules`
- [x] 1.2 Bundle it with the skills; `bundle.ts` loads it; the package ships it; `sync.ts` keeps no copy

## 2. Drift tests

- [x] 2.1 OpenSpec minimum against spec section 11.6, ADR-016, `upgrade.md` and the AGENTS template
- [x] 2.2 Install command against `upgrade.md`; telemetry opt-out against spec section 11.8
- [x] 2.3 Node minimum against ADR-018, `engines` and the installer README
- [x] 2.4 Tool registry against ADR-017's table; marker strings against ADR-013

## 3. Tests and records

- [x] 3.1 Existing tests use the constants, the template or the source files instead of kit literals
- [x] 3.2 Mutation check by hand: a changed source value fails the suite
- [x] 3.3 `CHANGELOG.md`; `npm audit` 0; `openspec validate installer-single-source --strict` passes
