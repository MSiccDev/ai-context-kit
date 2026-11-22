# Proposal

## Why

The review of the 2.0.0 release found two bugs in code that is already published as npm 2.0.0 (findings on MSiccDev/ai-context-kit#105, deferred there to this hotfix):
- **P1:** `ack-loop-03-review` treats `skip_specs: true` as proof that a change has no behaviour impact. A repository whose `AGENTS.md` sets the flag for every change, as this one does, gets a false blocking Spec-axis finding.
- **P2:** ADR-014 says the installer copies `THIRD_PARTY_NOTICES.md` next to installed skills. It never did, so adapted skills reach consumer repositories without their MIT notices.

The maintainer also chose staged publishing for npm. The trusted publisher allows `npm stage publish` only, so the release workflow has to stage instead of publish.

## What Changes

- `ack-loop-03-review` 1.0.1: the `skip_specs` check honours an `AGENTS.md` that sets the flag for every change. Behaviour is then checked against the normative spec that file names.
- Installer: `plan()` writes `ai-context-kit-LICENSE` and `ai-context-kit-THIRD_PARTY_NOTICES.md` once into each tool's skills folder, as managed files. The names are namespaced, as the maintainer decided on 2026-11-22. ADR-014 gets a dated clarification; the installer README lists the files.
- `release.yml`: `npm stage publish`, for the dry run and the real run, with npm 11.21.3. `installer/RELEASING.md` drops its "still runs npm publish" note.
- Version 2.0.1 in the plugin manifests and the installer package and lockfile; a `[2.0.1]` changelog entry. The spec stays at 2.0.0.

Touches skill `ack-loop-03-review`, ADR-014, the installer, `release.yml`. No spec or template change.

## Capabilities

### New Capabilities

None as OpenSpec capability specs (see `openspec/config.yaml`); this change sets `skip_specs: true`.

### Modified Capabilities

None.

## Impact

- `ai-context-kit update` adds the two notice files to existing installs.
- Releasing 2.0.1 needs the stage-only trusted publisher created within 2 days of the merge, then an approval (`installer/RELEASING.md`).
