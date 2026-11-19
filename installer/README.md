# @msiccdev/ai-context-kit

Per-repository installer for [AI Context Kit](https://github.com/MSiccDev/ai-context-kit) skills. It copies the kit's `ack-*` skills into each tool's skills folder, adds a short kit section to `AGENTS.md` (and a `CLAUDE.md` that imports it for Claude Code), and records what it wrote so updates never overwrite your edits.

> Under development for AI Context Kit 2.0; not yet published.

## Commands

```bash
npx @msiccdev/ai-context-kit@latest init --tools claude,codex
```

| Command | What it does |
| --- | --- |
| `init [path] --tools <ids\|all\|none>` | Installs skills for the given tools, or for the tools it detects |
| `update [path] [--force]` | Refreshes unedited files; writes `<file>.ai-context-kit-new` beside files you edited |
| `doctor [path] [--json]` | Checks Node, missing and edited files, the kit blocks, and outdated skills |
| `tools` | Lists tool ids, skills folders and how to start a skill |

Tool ids: `claude`, `codex`, `github-copilot`, `agents`. Requires Node.js 20.19 or later.

## Files it owns

- `.ai-context-kit/manifest.json`: every file the installer wrote, with its hash.
- `ack-*` folders in each tool's skills folder. Other folders, such as OpenSpec's `openspec-*`, are never touched.
- The text between `<!-- AI-CONTEXT-KIT:START -->` and `<!-- AI-CONTEXT-KIT:END -->` in `AGENTS.md` and `CLAUDE.md`.

## License

MIT. Some bundled skills adapt third-party work; see `THIRD_PARTY_NOTICES.md` in the package.
