# Command Reference Template

Use this table shape in the `Session Commands` section of the generated root `AGENTS.md`. Every project uses the kit's `ack-session` skill; there is no per-project prefix (spec section 8.4).

| Command | Value | Description | Example |
| --- | --- | --- | --- |
| `ack-session context` | - | Display current session state | `ack-session context` |
| `ack-session mode` | role names | Switch assistant role | `ack-session mode developer` |
| `ack-session phase` | phase names | Update work phase | `ack-session phase review` |
| `ack-session style` | `structured` \\| `minimal` \\| `detailed` \\| `annotated` | Change output verbosity | `ack-session style minimal` |
| `ack-session tone` | `technical` \\| `direct` \\| `detailed` \\| `concise` | Adjust communication tone | `ack-session tone concise` |
| `ack-session interact` | `advisory` \\| `pair` \\| `driver` | Set collaboration style | `ack-session interact pair` |
| `ack-session reset` | - | Reset session state to the project defaults | `ack-session reset` |

Below the table, state how each tool the project uses starts the skill, for example `/ack-session` in Claude Code and `$ack-session` in Codex.
