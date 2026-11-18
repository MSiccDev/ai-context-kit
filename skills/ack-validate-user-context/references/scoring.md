# Scoring: ack-validate-user-context

## Point model (100)
- YAML Frontmatter: 10
- Required Sections: 30
- Content Completeness: 30
- Format & Quality: 15
- Spec Compliance: 15

## Grade bands
- 90-100: PASS
- 75-89: PASS WITH WARNINGS
- 60-74: PASS WITH WARNINGS (Needs Improvement)
- <60: FAIL

## Critical findings
Each critical finding makes the status FAIL, whatever the score:
- The YAML frontmatter is missing or invalid.
- `applyTo` or `description` is missing.

## Scoring rules
- A critical finding takes its phase to 0.
- Each missing required section costs 2 points in Required Sections.
- Each other warning costs 1 to 3 points in its phase: 1 when it affects one place, 2 when it affects several, 3 when it affects most of the file.
- Enhancements cost nothing.
