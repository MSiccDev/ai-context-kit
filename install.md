# ai-context-kit

> Agent instructions: install AI Context Kit into the user's repository with the `@msiccdev/ai-context-kit` installer, then hand over to the `ack-setup` skill.

Follow the steps below in order, and stop where a step tells you to stop. Always write the package with its scope: the unscoped `ai-context-kit` on npm is an unrelated tool.

OBJECTIVE: Install the kit's skills into the user's repository with OpenSpec set up, and tell the user how to start `ack-setup`.

DONE WHEN:
- `.ai-context-kit/manifest.json` exists in the confirmed repository and `ai-context-kit init` exited with code 0.
- `openspec list --json` in that repository reports a `root`.
- The user has been told how to start `ack-setup` in each installed tool.

TODO:
- [ ] Check Node.js
- [ ] Check the OpenSpec CLI; install or upgrade it only with the user's confirmation
- [ ] Confirm the repository folder and the tools
- [ ] Ask about OpenSpec telemetry
- [ ] Run the installer and relay its output
- [ ] Tell the user how to start `ack-setup`

## Rules
- Run anything that installs software outside the project only after the user confirms it.
- Stop and ask again if an install needs sudo or administrator rights.
- Never edit shell startup files (`.bashrc`, `.zshrc`, `.profile`, fish or PowerShell profiles); tell the user what to change.
- Never switch Node.js versions or reconfigure a version manager for the user.
- Report what the commands printed, not what you expected them to print.

## 1. Node.js
Run `node --version`. The installer requires Node 22.12 or later. If Node is missing or older, say so, point the user to https://nodejs.org, and stop.

## 2. OpenSpec CLI
Run `openspec --version`. The kit requires OpenSpec 2.1.0 or later.
- Found and 2.1.0 or later: continue.
- Missing or older: show this command, explain that it installs software outside the project, and run it only after the user confirms:
  ```bash
  npm install -g @fission-ai/openspec@latest
  ```
  If the user installed OpenSpec with another package manager (`openspec version --json` reports `install.packageManager`), show that package manager's upgrade command instead. Run `openspec --version` again; if the command is still not found, say where it was installed and stop until the user has fixed their PATH.

## 3. Folder and tools
- Propose the repository root (the folder that contains `.git`) as the target, and wait for the user to confirm or name another folder.
- Infer the tools from the tool you are running in and from the folders present, then confirm the list with the user. Tool ids:

| Tool | Id | Start a skill |
| --- | --- | --- |
| Claude Code | `claude` | `/ack-setup` |
| Codex | `codex` | `$ack-setup` |
| GitHub Copilot | `github-copilot` | `/ack-setup` |
| Any other tool (shared `.agents/skills`) | `agents` | `/ack-setup` |

## 4. OpenSpec telemetry
Ask: "OpenSpec sends anonymous usage statistics by default. Keep them on? This is a machine-wide OpenSpec setting." The recommended answer is no. Use `off` for no and `on` for yes in the next step.

## 5. Run the installer
From the confirmed folder, run, with the confirmed ids separated by commas:
```bash
npx @msiccdev/ai-context-kit@latest init --tools <ids> --openspec-telemetry <on|off> --yes
```
- Relay what it printed: the files it created or updated, any `.ai-context-kit-new` conflict copies, and the OpenSpec output.
- A non-zero exit code: show the error and the guidance the installer printed, and stop.
- Then run `openspec list --json` and check that it reports a `root`.

## 6. Hand over
Tell the user:
- The kit's skills are named `ack-*` and were installed for the tools above.
- Start a new session if the tool does not list the new skills yet.
- Run `ack-setup` next, spelled for each installed tool as in the table in step 3. It recommends the skills that set up OpenSpec, project context and the user's own context, in order.
- `ack-guide` finds the right skill for any later task, and `npx @msiccdev/ai-context-kit doctor` checks the install.

`ack-setup` is user-invoked: the user starts it, not you.

EXECUTE NOW: start with step 1.
