# Design

## Context

Every commit on `main` is a release, and releases are not tagged. npm trusted publishing (npm's documentation, read 2026-11-21) needs npm 11.5.1 or later, Node 22.14 or later, a GitHub-hosted runner and `id-token: write`. It works only for a package that already exists. The trusted-publisher entry names the owner, repository, workflow file name and an optional environment, all case-sensitive. Provenance is automatic when the repository and package are public and `package.json`'s `repository.url` matches the repository.

## Goals / Non-Goals

**Goals:**
- Publishing follows the existing release flow: merging `release/<version>` into `main` publishes that version, with no token stored anywhere.
- A pull request can neither publish nor obtain an OIDC token.

**Non-Goals:**
- Automating the first publish (maintainer's decision: by hand).
- Release notes or GitHub releases; `CHANGELOG.md` stays the record.

## Decisions

- **Two jobs.** `verify` has `contents: read` only and runs everywhere, including pull requests. `publish` needs `verify`, runs only for `main`, and is the only job with `id-token: write`.
- **Environment `npm`.** The `publish` job declares `environment: npm`. In GitHub the environment allows deployments from `main` only; on npmjs.com the trusted publisher names the same environment. Even a workflow edited on a branch cannot publish.
- **Publish only new versions.** `npm view <name>@<version>` decides. A version already on npm makes the push a no-op, so commits on `main` that do not bump the version publish nothing.
- **Pinned npm.** The jobs run Node 24 and install `npm@11.6.2`. That satisfies trusted publishing and avoids npm 10's resolver crash on this lockfile.
- **`prepack` builds.** `npm publish` runs `prepack`, so the package always holds a fresh `dist/`, `skills/` and `templates/`.

## Test Seams

Agreed with the maintainer on 2026-11-21:
- `scripts/test-check-version-sync.sh`: fixtures carry the installer's `package.json` and lockfile, plus a drift case for each.
- Drift tests in `installer/test/drift.test.ts`: `repository.url` matches the plugin manifests' repository; `release.yml` uses a Node version that satisfies trusted publishing, pins npm 11.5.1 or later, grants `id-token: write` only to the job in environment `npm`, and publishes from `installer/`.
- `npm publish --dry-run` and `npm pack --dry-run` locally: the file list holds `dist/`, `skills/`, `templates/`, `THIRD_PARTY_NOTICES.md`, `README.md`, `LICENSE` and `package.json` only. Recorded in the pull request.
- `release.yml` runs on this pull request in dry-run mode.

## Risks / Trade-offs

- If `release/2.0.0` merges before the manual first publish, `publish` fails because no trusted publisher exists yet. `RELEASING.md` orders the steps; recovery is to publish by hand and re-run the job.
