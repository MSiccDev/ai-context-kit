# ADR-018: The installer requires Node 22.12 or later

- Status: Accepted
- Date: 2026-11-19
- Source: OpenSpec change `installer-mvp`; supersedes the Node version in [ADR-017](ADR-017-installer-tool-registry.md)'s stack line

## Context

[ADR-017](ADR-017-installer-tool-registry.md) set the installer's runtime to Node 20.19 or later, the same floor OpenSpec sets ([ADR-013](ADR-013-installer-package-and-binary.md) relies on that to say Node adds no new prerequisite). Node 20 reached end of life in April 2026 and no longer receives security fixes, and GitHub has deprecated Node 20 as the runtime for JavaScript actions on its runners.

## Decision

- The installer requires **Node 22.12 or later** (`engines`, `doctor`'s Node check).
- CI tests Node 22.12.0, the minimum, and Node 24, on Linux, macOS and Windows.
- The kit's workflows use `actions/checkout@v7` and `actions/setup-node@v7`, which run on Node 24.

## Consequences

- The installer's floor is now higher than OpenSpec's (20.19). A user on Node 20 can run OpenSpec but not the installer; `doctor` and the installer docs say so.
- ADR-013's "Node adds no new prerequisite" holds only for users on Node 22.12 or later.
- The minimum follows Node's maintained release lines and is reviewed with the OpenSpec minimum (ADR-016).
