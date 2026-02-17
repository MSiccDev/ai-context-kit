# Phase Checks: validate-project-instructions

Execute these phases in order.

## Phase 1: YAML Frontmatter Validation
Check:
- valid YAML frontmatter
- required attributes: `name`, `description`, `applyTo`
- naming constraints on `name`
- no unsupported attributes

## Phase 2: Required Sections Validation
Check:
- all 17 required sections exist
- section order and heading levels are correct
- no placeholder-only sections

## Phase 3: Session State Model Validation
Check:
- Default Session State includes all 6 required elements
- Command Reference includes all required namespaced commands

## Phase 4: Role Definitions Validation
Check:
- at least 3 roles
- role table has complete columns
- each role has 3-5 project-specific example task patterns
- transition examples include natural language and command forms

## Phase 5: Content Completeness And Quality Validation
Check completeness for:
- prerequisites/overview/tech stack/objectives/principles
- repository context/working together/key components
- testing strategy/documentation standards/testing commands
- related files/future roadmap
