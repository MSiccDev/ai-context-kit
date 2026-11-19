# Design

## Context

ADR-013 fixes the package name, bin, manifest path and marker strings; ADR-017 fixes the 2.0 tool registry (`claude`, `codex`, `github-copilot`, `agents`), the `installer/` home, the stack, copies instead of symlinks, and a `CLAUDE.md` that imports `@AGENTS.md`. The maintainer decided on 2026-11-19: a short kit block in `AGENTS.md`, no runtime dependencies, `doctor` checks Node, manifest integrity, marker blocks and stale skills, and a three-OS CI matrix.

## Goals / Non-Goals

**Goals:**
- `init`, `update`, `doctor` and `tools` for the four 2.0 tools, safe to run repeatedly.
- No edit of a user's file is ever lost.

**Non-Goals:**
- OpenSpec checks and `openspec init` (step 3), `ack-setup` and `install.md` (step 4), npm publishing (step 6), `remove` and `--dry-run` (2.1).

## Decisions

- **Layout.** `installer/src/` holds `cli.ts` (argument parsing with `node:util` `parseArgs`), `registry.ts` (ADR-017's table as data), `bundle.ts` (reads the bundled skills), `manifest.ts`, `markers.ts`, and one module per command. A build step copies `skills/ack-*` into `installer/skills/` (git-ignored) without the `SKILL.validation.md` reports; the package ships `dist/` and `skills/`.
- **One write path.** Every write goes through a function that records the path and the sha256 of the bytes written; files are written with LF line endings so hashes match on every OS.
- **Shared folders.** `codex` and `agents` share `.agents/skills/`; each skill is written once per folder. Only `ack-*` folders are touched, never `openspec-*` or `.openspec-target`.
- **Provenance.** Each installed `SKILL.md` gets `generatedBy: "ai-context-kit@<version>"` in `metadata`; the rest of the file equals the source (parity test).
- **Codex sidecars.** For every skill with `metadata.invocation: "user"` in a folder Codex reads, `agents/openai.yaml` holds `interface` (`display_name`, `short_description`) and `policy.allow_implicit_invocation: false`. Format taken from working examples in mattpocock/skills; OpenAI's docs were unreachable.
- **Marker blocks.** `<!-- AI-CONTEXT-KIT:START -->` … `<!-- AI-CONTEXT-KIT:END -->`. `AGENTS.md` gets a short block (installed skills per tool, how to start them, "run `ack-setup` next"); `CLAUDE.md` gets `@AGENTS.md`. A missing file is created with only the block; an existing file gets the block appended once; text outside the markers is never changed, byte for byte: these files are read raw and the block uses the file's own line ending (CRLF or LF), while hashes compare the block body with LF (Codex review). The manifest records each block's hash.
- **Update rule.** Hash matches: overwrite. Hash differs: write `<file>.ai-context-kit-new` and report (`--force` overwrites). An existing `.ai-context-kit-new` that differs from the new version is never overwritten, even with `--force`, because the user may be merging in it (Codex review). File missing: leave it deleted and keep it marked deleted in the manifest. A skill new in the bundle is added; a managed file dropped from the bundle is deleted only if unedited.
- **Detection.** Without `--tools`, a tool counts as present when one of its detection paths exists (OpenSpec's paths); if none is found, `init` stops and asks for `--tools`.
- **Path safety** (security review). Every managed path, including manifest entries, must be relative, use forward slashes, and contain no empty, `.` or `..` segment, drive letter or absolute prefix. Before any read, write or delete, each existing part of the path below the repository root is checked with `lstat`; a symbolic link or junction makes the installer refuse that path and exit 1. An unsafe manifest stops `init` and `update` before they touch anything; `doctor` reports unsafe paths without reading them. The repository root itself may be a link. A race between the check and the write needs local access and is out of scope.
- **Development dependencies.** `npm audit --audit-level=moderate` runs in CI; the package has no runtime dependencies.
- **Exit codes.** 0 success, 1 problems found (`doctor`) or refused write, 2 usage error.

## Test Seams

Agreed with the user before tasks were written:
- **Command level:** each command runs through an exported `run(argv, { cwd })` against a temporary repository, and tests assert the files on disk, the manifest and the exit code. No test calls private helpers.
- **Golden file lists:** for `--tools claude`, `codex`, `github-copilot`, `agents` and `all`, the set of files `init` writes matches a snapshot.
- **Parity:** every installed `SKILL.md` equals its source in `skills/` except the added `generatedBy` line.
- **Update safety:** an edited file yields `.ai-context-kit-new` and stays unchanged; a deleted file stays deleted; text outside marker blocks is never changed; a second `init` changes nothing.
- **Doctor:** reports a missing file, an edited file, a missing marker block, a stale skill and an old Node version, with `--json` output.
- **CI:** the same suite passes on Linux, macOS and Windows.
- `openspec validate installer-mvp --strict` passes before archive.

## Risks / Trade-offs

- Installed skills keep their relative links to `../../specs/` and `../../docs/`, which do not exist in a user's repository; the plugin installs have the same gap today. Recorded as a follow-up, not fixed here.
- The sidecar format rests on upstream examples; `doctor` can check it once OpenAI's docs are reachable.
