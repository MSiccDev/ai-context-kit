# Optional JSON Metadata Schema

Use this only when the user asks for structured metadata.

## Required top-level objects
- `user`
- `technical`
- `projects`
- `preferences`
- `communication`
- `goals`
- `constraints`
- `exclusions`

## Consistency Rule
- JSON must be valid.
- JSON values must align with the markdown narrative.
- Do not introduce extra facts in JSON that are absent from the markdown sections.
