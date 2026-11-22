# Nested Schema: ack-create-agents-md

A nested `AGENTS.md` refines the root file for one folder. It says only what differs, and points to the root file for everything else.

## Required Sections (in order)

| Section | Content |
| --- | --- |
| Scope | Which folder this file governs, and that the root `AGENTS.md` applies everywhere else |
| What This Folder Overrides | Only the rules that differ from the root file. Each entry names the root rule it refines. Write "None" if nothing is overridden. |
| Local Map | The folder's own paths and their purpose |
| Local Commands | Build and test commands that run from this folder, if they differ from the root; otherwise "Same as root" |
| Key References | A relative link to the root `AGENTS.md`, plus local references |

## Rules
- Do not repeat root content: no session-state contract, session commands, drift-control rule or spec-driven section.
- To change one of those for this folder, state it under "What This Folder Overrides", naming the root rule.
- Use relative paths only, and keep wording provider-neutral.
