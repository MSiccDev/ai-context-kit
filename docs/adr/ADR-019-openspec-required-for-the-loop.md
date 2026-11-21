# ADR-019: OpenSpec is required for the implementation loop, not for every kit repository

- Status: Accepted; implementation planned for 2.1
- Date: 2026-11-21
- Source: maintainer discussion before `release/2.0.0`; narrows the scope of [ADR-001](ADR-001-openspec-is-mandatory.md)

## Context

[ADR-001](ADR-001-openspec-is-mandatory.md) makes OpenSpec mandatory for every change in every kit-managed repository, and spec section 11.1 requires an `openspec/` root in each. Some repositories hold documentation or content only: there is no system whose behaviour a spec describes, so a proposal, design and tasks for every edit is overhead, and `skip_specs: true` on every change is ceremony. Such repositories still benefit from the rest of the kit: user context, `AGENTS.md`, session state, `ack-guide`, the interview skills and checkpoints.

ADR-001 rejected optional OpenSpec because two paths for building work, one with a contract and one without, would give every downstream rule a fallback. That reason concerns the implementation loop, not the rest of the kit.

## Decision

- OpenSpec is required where the implementation loop runs, not in every kit repository.
- A repository either uses the spec-driven workflow (the 2.0 behaviour, unchanged) or declares in its `AGENTS.md` spec-driven section that it does not ("Spec-driven workflow: not used").
- Without the workflow, the kit's session, context, navigation, interview and checkpoint skills work as usual. The `ack-loop-*` skills stop and say that the loop needs OpenSpec; there is no OpenSpec-free implementation path.
- The intended case is documentation and content repositories. A repository that builds software keeps the workflow.
- 2.0.0 ships with OpenSpec mandatory. This decision is implemented in 2.1; relaxing a requirement is not a breaking change.

## Consequences

- 2.1 changes, as one OpenSpec change:
  - Spec section 11.1 applies to repositories that use the workflow; a new clause defines the "not used" declaration.
  - `templates/AGENTS_template.md` offers the "not used" form of the spec-driven section.
  - The installer gains a way to skip OpenSpec (for example `init --no-openspec`), recorded in the manifest; `doctor` stops reporting a missing OpenSpec root for such repositories.
  - `install.md` and `ack-setup` ask whether the repository uses the workflow before recommending OpenSpec.
  - `ack-validate-agents-md` scores phase 3 as not applicable for a "not used" declaration; `ack-create-agents-md` writes either form.
  - The loop skills and `ack-guide` name the requirement when the workflow is not used.
- ADR-001 stays in force for every repository that uses the workflow, including this one.
- Turning the workflow on later is the 2.0 setup: `openspec init`, then refresh `AGENTS.md`.

## Alternatives considered

- **Keep OpenSpec mandatory everywhere:** rejected; it keeps documentation and content repositories out of the kit or forces `skip_specs` ceremony on every edit.
- **A light profile with its own implementation loop (plain task list):** rejected for ADR-001's two-path reason.
- **Build it before 2.0.0:** rejected; it would delay the release with a change across the spec, template, installer, `install.md`, `ack-setup` and validators, and it can ship later without breaking anyone.
