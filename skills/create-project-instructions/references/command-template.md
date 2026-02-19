# Command Reference Template

Use this table shape inside the generated project AGENTS context.
Replace `/tag` with the project-specific command namespace prefix.

| Command | Parameters | Description | Example |
| --- | --- | --- | --- |
| `/tag.context` | - | Display current session state | `/tag.context` |
| `/tag.mode [role]` | role names | Switch assistant role | `/tag.mode developer` |
| `/tag.phase [name]` | phase names | Update work phase | `/tag.phase testing` |
| `/tag.style [type]` | `structured` \\| `minimal` \\| `detailed` \\| `annotated` | Change output verbosity | `/tag.style minimal` |
| `/tag.tone [style]` | `technical` \\| `direct` \\| `detailed` \\| `concise` | Adjust communication tone | `/tag.tone concise` |
| `/tag.interact [mode]` | `advisory` \\| `pair` \\| `driver` | Set collaboration style | `/tag.interact pair` |
| `/tag.reset` | - | Reset session state | `/tag.reset` |
