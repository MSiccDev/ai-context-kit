# Phase Checks: validate-agents-md

Execute these phases in order.

## Phase 1: Core Presence And Structure
Check:
- target AGENTS file exists
- purpose and model are explicit
- source precedence and repository map are present
- structure is scannable

## Phase 2: Operational Contract Completeness
Check:
- session-state summary
- no-silent-transitions rule
- ambiguity rule
- command namespace and command reference
- default state values (when defined)
- formatting/path stability rules
- drift-control rule
- nested AGENTS precedence policy

## Phase 3: Clarity, Actionability, Conciseness
Check:
- guidance is actionable and testable
- no ambiguous/conflicting policy statements
- no overstuffed spec duplication

## Phase 4: Portability And Neutrality
Check:
- provider-neutral language
- tool/runtime portability
- no mandatory single-runtime assumptions

## Phase 5: Link Integrity And Repository Alignment
Check:
- relative links resolve
- referenced paths exist
- canonical path guidance matches repository reality
