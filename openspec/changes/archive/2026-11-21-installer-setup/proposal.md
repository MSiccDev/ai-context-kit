# Proposal

## Why

Plan Part 3, rollout step 4 (the agentic half of the installer; ADR-013, ADR-015, ADR-017). `ai-context-kit init` does the deterministic work: it copies the skills, writes the marker blocks and the manifest, and sets up OpenSpec. It then tells the user to run `ack-setup`, which does not exist yet. And nothing yet tells an agent how to run the installer for a user: ADR-013 makes an agent-executable `install.md` the front door.

## What Changes

- New user-invoked skill **`ack-setup`** 1.0.0. Run once per repository after `init`: it explores the repository, presents its findings with a recommended next skill per area (project context, OpenSpec, user context), confirms the order with the user, and ends with the list of skills to run. It writes nothing itself; `ack-create-agents-md`, `ack-create-user-context` and the OpenSpec CLI keep their homes. It runs the model-invoked `ack-openspec-check`; the user-invoked skills it recommends are started by the user. Adapts the explore, present, confirm pattern of Matt Pocock's `setup-matt-pocock-skills` (MIT).
- User context: `ack-setup` asks where the user's context file lives and how their tools load it, and never copies it into the repository. The kit records no per-tool user-level paths.
- New **`install.md`** at the repository root, modelled on OpenSpec's: OBJECTIVE, DONE WHEN, TODO, then steps that check Node, check the OpenSpec CLI (install only with consent, no sudo, no shell-profile edits), confirm the folder, infer the tools, ask about OpenSpec telemetry, run `npx @msiccdev/ai-context-kit@latest init`, and tell the user how to start `ack-setup` in each tool.
- `ack-guide` 1.2.0 routes a new repository to `install.md` and `ack-setup`.
- Records: `skills/README.md`, `README.md` skill lists, `THIRD_PARTY_NOTICES.md`, plan Part 3 rollout step 4, `CHANGELOG.md`.

- `ack-create-agents-md` 2.2.0 keeps the installer's `AI-CONTEXT-KIT` marker block unchanged, so a full rewrite of `AGENTS.md` after `init` does not drop it.

Touches skills `ack-setup` (new), `ack-guide` and `ack-create-agents-md`; no template or spec section changes. Follows ADR-013 and ADR-017; needs no new ADR.

## Capabilities

### New Capabilities

None as OpenSpec capability specs (see `openspec/config.yaml`); this change sets `skip_specs: true`.

### Modified Capabilities

None.

## Impact

- The installer's closing message and `AGENTS.md` block already name `ack-setup`; this change makes the pointer resolve.
- `install.md` names `@latest`, which works once step 6 publishes the package; until then it is tested against a locally packed installer.
