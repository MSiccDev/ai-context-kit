# Proposal

## Why

Plan Part 3, rollout step 6: publish `@msiccdev/ai-context-kit` (ADR-013), rewrite the canonical install block, and retire the template-repository path the README already marks as phasing out. Until the package is on npm, `install.md` and the installer's README point to a command that does not work.

## What Changes

- New workflow `.github/workflows/release.yml`:
  - **`verify`** runs on pull requests that touch the release path, on pushes to `main` and by hand. It installs, audits, type-checks, tests, and runs `npm publish --dry-run`.
  - **`publish`** runs only on `main`, in the GitHub environment `npm`, with `id-token: write`. It publishes through npm trusted publishing (no token) when `installer/package.json`'s version is not on npm yet: a pre-release version goes to the `next` dist-tag, any other to `latest`. Provenance is generated automatically.
- The first publish (2.0.0) is done by hand by the maintainer, because npm only lets a trusted publisher be added to an existing package (maintainer's decision, 2026-11-21). `installer/RELEASING.md` holds the one-time and per-release steps.
- `scripts/check-version-sync.sh` also checks `installer/package.json` and `installer/package-lock.json`; its tests cover both.
- `installer/package.json` gets a `prepack` script, so `npm publish` and `npm pack` always build first.
- README: a canonical install block (`install.md` for agents, the `npx` command for people) leads Quick Start. The template-repository section is replaced by a short note for existing template users (maintainer's decision, 2026-11-21).
- Records: plan Part 3 step 6, `CHANGELOG.md`.

Touches no skill, template or spec section. Follows ADR-013, ADR-017 and ADR-018; needs no new ADR.

## Capabilities

### New Capabilities

None as OpenSpec capability specs (see `openspec/config.yaml`); this change sets `skip_specs: true`.

### Modified Capabilities

None.

## Impact

- The maintainer creates the `npm` environment (deployments from `main` only) and, after the first manual publish, the trusted publisher on npmjs.com, then sets "Require two-factor authentication and disallow tokens".
- `release/2.0.0` must bump `installer/package.json` and its lockfile with the plugin manifests, or version sync fails.
