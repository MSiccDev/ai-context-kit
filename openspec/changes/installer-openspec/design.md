# Design

## Context

The installer MVP (`installer-mvp`) installs skills, kit blocks and the manifest, with no runtime dependencies and every file operation behind the path guard. The maintainer decided on 2026-11-20: print the OpenSpec install command and stop rather than install it; ask about telemetry with "off" as the non-interactive default; check but never change an existing `openspec/` root; seed `config.yaml` in a managed block only when `context` and `rules` are absent.

## Goals / Non-Goals

**Goals:**
- One `init` run leaves a repository with the kit's skills and a working OpenSpec set-up, or stops with exact next steps.
- No OpenSpec telemetry is sent before the user has answered.

**Non-Goals:**
- Installing or upgrading the OpenSpec CLI, running `openspec update`, or editing `config.yaml` keys the user owns.
- `ack-setup` and `install.md` (step 4).

## Decisions

- **OpenSpec behind one module.** `openspec.ts` runs the CLI through an `exec` function on `Io` (default: `child_process.spawnSync` without a shell, with `OPENSPEC_TELEMETRY=0` set). Tests pass a fake `exec`; one end-to-end test uses the real CLI.
- **Version rule.** Same as `ack-openspec-check` and ADR-016: missing or older than 2.1.0 stops; a later major continues with a note.
- **Prompts.** `Io.ask(question)` returns the answer; the CLI uses `node:readline` only when stdin is a TTY and `--yes` is not set. Otherwise the flag or the default applies, and the report says which.
- **Telemetry answer stored.** The manifest keeps `openspec.telemetry` so a second `init` does not ask again.
- **config.yaml block.** YAML has no HTML comments, so the block uses `# ai-context-kit:start` and `# ai-context-kit:end` lines and holds the top-level `context` and `rules` keys. Presence of either key outside the block, in any spelling (bare, double- or single-quoted, explicit `? key`), means "user owns it": no write, a report line. Without a YAML parser the check is conservative (Codex review): a top level that is not a plain block mapping, such as a flow mapping, a document marker, a directive, an anchor, an alias, a merge key or a tag, is also left alone and reported. The block goes through the path guard and the manifest like every other managed text.
- **Project scope.** `openspec init` runs with `--scope project`; without it OpenSpec 2.1 installs its skills machine-wide in `~/.agents/skills` (found by the end-to-end test).
- **Order.** Skills and blocks first, then OpenSpec, so a missing CLI still leaves the kit files installed and the exit code says what is left.

## Test Seams

Agreed with the user before tasks were written:
- **Command level with a fake OpenSpec:** `run(argv, { cwd, exec, ask })` against a temporary repository; tests assert exit code, output, files and the calls made to `exec`:
  - CLI missing, too old, current, and a later major;
  - telemetry: interactive yes and no, `--openspec-telemetry off|on`, default off, no second question on re-run, and `OPENSPEC_TELEMETRY=0` on every call before the answer;
  - no root (runs `openspec init --tools` with the same ids) versus existing root (dry run only, stale files reported, `openspec update` never called);
  - `config.yaml` block added when absent, untouched when `context` or `rules` exists, refreshed by `update`.
- **doctor:** reports an old or missing CLI, a missing root and stale files.
- **End to end:** one test runs the real OpenSpec 2.1.0 CLI (dev dependency) in a temporary repository: `init --tools claude,codex --openspec-telemetry off` leaves `openspec list --json` with a root, the managed `config.yaml` block, and a manifest with the OpenSpec version. Runs on Linux, macOS and Windows in CI.
- `npm audit` stays at 0 and `openspec validate installer-openspec --strict` passes.

## Risks / Trade-offs

- The end-to-end test depends on OpenSpec's CLI output; it asserts files and `openspec list --json`, not printed text.
- Setting telemetry off is machine-wide; the prompt and the report say so.
