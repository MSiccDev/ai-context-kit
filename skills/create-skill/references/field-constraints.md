# Field Constraints: create-skill

## Required frontmatter
- `name`
- `description`

## Optional frontmatter
- `version`
- `license`
- `compatibility`
- `metadata`
- `allowed-tools`

## Constraint rules
- `name`: 1-64 chars, lowercase alphanumeric + hyphen, no leading/trailing hyphen, no consecutive hyphens, matches folder name.
- `description`: 1-1024 chars, must state what the skill does and when to use it.
- `compatibility`: optional, 1-500 chars.
- `metadata`: optional map of string keys to string values.
