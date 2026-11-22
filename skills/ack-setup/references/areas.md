# Setup Areas: ack-setup

Work through the areas in this order. Each lists what to read, the possible findings, and the recommendation for each finding. Spell every skill for each tool in the manifest's `tools` list.

## Sources to read first
- `.ai-context-kit/manifest.json`: installed tools, kit version, OpenSpec version and telemetry answer. Missing: the kit is not installed here; recommend `install.md` and stop.
- `ai-context-kit doctor` (or `npx @msiccdev/ai-context-kit doctor`): its findings, where it runs.
- `AGENTS.md` and `CLAUDE.md`: whether `AGENTS.md` has kit content outside the `<!-- AI-CONTEXT-KIT:START -->` block (the `<!-- spec_version: ... -->` stamp marks a kit-generated file).
- `openspec/` and `ack-openspec-check`'s status.
- `docs/adr/` and `git remote -v`: context for the project-context interview, reported in the findings.

## 1. OpenSpec
First, so that `ack-create-agents-md` states the real OpenSpec state in its spec-driven section.
| `ack-openspec-check` status | Recommendation |
| --- | --- |
| `NO_CLI` or `UPGRADE_CLI` | Its upgrade steps, then `ai-context-kit init` again so the installer sets up `openspec/` |
| `UPDATE_FILES` or `UNVERIFIED` | `openspec update --dry-run`, then `openspec update` |
| `OK` or `NEWER`, no `openspec/` | `ai-context-kit init` again |
| `OK` or `NEWER`, `openspec/` present | Nothing; the first change starts with `openspec-propose` |

## 2. Project context
| Finding | Recommendation |
| --- | --- |
| `AGENTS.md` holds only the installer's block | `ack-create-agents-md` in root mode |
| `AGENTS.md` has content but no `spec_version` stamp | `ack-create-agents-md` in root mode; it shows a diff before replacing anything |
| `AGENTS.md` is a kit file | `ack-validate-agents-md`, then `ack-create-agents-md` only if the report asks for it |

## 3. User context
Ask: "Do you have a user context file (`*.instructions.md`)? Where does it live, and how do your tools load it?"
| Answer | Recommendation |
| --- | --- |
| No file yet | `ack-create-user-context`, saved outside this repository |
| A file exists | `ack-validate-user-context` on it |
| Unsure how a tool loads it | Point to that tool's documentation for personal or user-level instructions |
