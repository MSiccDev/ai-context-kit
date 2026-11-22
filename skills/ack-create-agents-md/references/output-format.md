# Output Format: ack-create-agents-md

Return one complete markdown artifact and a short completion summary.

## Artifact contract
- Provide one markdown code block containing the complete `AGENTS.md`.
- State the target path: `AGENTS.md` for root mode, `<folder>/AGENTS.md` for nested mode.

## Completion summary contract
Include:
- the mode (root or nested) and why
- root mode: role count, default session state, the OpenSpec root and active change (or that OpenSpec is not yet initialised), testing command coverage
- nested mode: the overrides and the local commands
- how discovery phase 6 ran (`openspec list --json`, or reading `openspec/` because the CLI was unavailable)
- assumptions and unresolved gaps
