# OpenSpec Version Rule And Upgrade Steps: ack-openspec-check

## The rule
- Minimum: **2.1.0** (spec section 11.6, ADR-016). Compare versions as semver; a pre-release of 2.1.0 counts as older.
- A later major version than 2 is `NEWER`: continue, and note that the kit was tested with 2.1.0.

## Classifying the CLI
| `openspec --version` | Status |
| --- | --- |
| Command not found | `NO_CLI` |
| Older than 2.1.0 (for example `1.13.2`) | `UPGRADE_CLI` |
| 2.1.0 or a later 2.x | current; check the files |
| 3.0.0 or later | `NEWER`; check the files |

OpenSpec 1.x has no `openspec version` command; an "unknown command 'version'" error also means `UPGRADE_CLI`.

## Classifying the generated files
- **Primary:** `openspec update --dry-run --json` (2.x). A non-empty `changes` list means `UPDATE_FILES`. Entries with `"action": "delete"` under `.claude/commands/opsx/` are 1.x command files.
- **Fallback** when the dry run fails: read the frontmatter of each generated `openspec-*/SKILL.md` (in `.agents/skills/`, `.claude/skills/` and other tool folders). OpenSpec 1.x writes `metadata.generatedBy` (for example `"1.13.2"`) and 2.x does not, so any `generatedBy` field, or a `.claude/commands/opsx/` folder, means `UPDATE_FILES`. With neither marker the fallback cannot tell current 2.x files from older 2.x files: report `UNVERIFIED`, never `OK`.
- No generated files at all means OpenSpec is not set up in this repository; report that, and leave `openspec init` to the calling skill.

## Upgrade steps
Show only the steps the status needs. The user runs them.

**`NO_CLI` or `UPGRADE_CLI`: install or upgrade the CLI** (Node.js 20.19 or later):
```bash
npm install -g @fission-ai/openspec@latest
```
If `openspec version --json` reports another `install.packageManager` (for example pnpm, yarn, bun or Homebrew), use that package manager's upgrade command instead, as OpenSpec's installation docs describe. Then run `openspec --version` again and continue with the file check.

**`UPDATE_FILES` or `UNVERIFIED`: refresh or confirm the repository's OpenSpec files**, from the repository root (for `UNVERIFIED`, the dry run shows whether anything is out of date):
```bash
openspec update --dry-run
```
```bash
openspec update
```
- The dry run lists what changes. `openspec update` rewrites the generated `openspec-*` skills and deletes the 1.x `/opsx:*` command files; OpenSpec 2.x workflows are skills (`/openspec-propose` in most tools, `$openspec-propose` in Codex).
- It can replace the copies in `.claude/skills/` with symlinks to `.agents/skills/`. On Windows, enable git symlink support (`core.symlinks=true`, with Developer Mode) before committing.
- Review the diff and commit it like any other change.
