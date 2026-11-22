# @msiccdev/ai-context-kit

Per-repository installer for [AI Context Kit](https://github.com/MSiccDev/ai-context-kit) skills. It copies the kit's `ack-*` skills into each tool's skills folder, adds a short kit section to `AGENTS.md` (and a `CLAUDE.md` that imports it for Claude Code), and records what it wrote so updates never overwrite your edits.

To have an agent run the installer for you, paste the link to [`install.md`](https://github.com/MSiccDev/ai-context-kit/blob/main/install.md) into it; it checks Node and OpenSpec, asks before installing anything, and ends with `ack-setup`.

## Commands

```bash
npx @msiccdev/ai-context-kit@latest init --tools claude,codex
```

| Command | What it does |
| --- | --- |
| `init [path] --tools <ids\|all\|none> [--openspec-telemetry on\|off]` | Installs skills for the given tools (or the tools it detects), then sets up OpenSpec: runs `openspec init --scope project` when the repository has no OpenSpec root, and adds the kit's `context` and `rules` to `openspec/config.yaml` when that file has none |
| `update [path] [--force]` | Refreshes unedited files; writes `<file>.ai-context-kit-new` beside files you edited |
| `doctor [path] [--json]` | Checks Node, the OpenSpec CLI and root, missing and edited files, the kit blocks, and outdated skills |
| `tools` | Lists tool ids, skills folders and how to start a skill |

Tool ids: `claude`, `codex`, `github-copilot`, `agents`. Requires Node.js 22.12 or later and the OpenSpec CLI 2.1.0 or later:

```bash
npm install -g @fission-ai/openspec@latest
```

The installer never installs or upgrades OpenSpec and never runs `openspec update`; it prints the command when one is needed.

## OpenSpec telemetry

OpenSpec sends anonymous usage statistics by default. `init` asks before any OpenSpec call; in a non-interactive run it turns them off unless you pass `--openspec-telemetry on`. Turning them off runs `openspec config set telemetry.enabled false`, which applies to every project on the machine. You can also set `OPENSPEC_TELEMETRY=0`.

## Files it owns

- `.ai-context-kit/manifest.json`: every file the installer wrote, with its hash.
- `ack-*` folders in each tool's skills folder. Other folders, such as OpenSpec's `openspec-*`, are never touched.
- `ai-context-kit-LICENSE` and `ai-context-kit-THIRD_PARTY_NOTICES.md` in each tool's skills folder: the kit's license and the licenses of the work its skills adapt.
- The text between `<!-- AI-CONTEXT-KIT:START -->` and `<!-- AI-CONTEXT-KIT:END -->` in `AGENTS.md` and `CLAUDE.md`, and between `# ai-context-kit:start` and `# ai-context-kit:end` in `openspec/config.yaml`.

## License

MIT. Some bundled skills adapt third-party work; see `THIRD_PARTY_NOTICES.md` in the package.
