# ADR-014: Credit every adapted source where it lands and once centrally

- Status: Accepted
- Date: 2026-09-27
- Source: [2.0 adoption plan, Attribution](../plans/2.0-adoption-plan.md#attribution)

## Context

2.0 adapts material from two MIT-licensed projects: mattpocock/skills (MIT, Copyright (c) 2026 Matt Pocock) and Fission-AI/OpenSpec (MIT, Copyright (c) 2024 OpenSpec Contributors). MIT allows adaptation as long as the copyright and permission notice travel with substantial copies. Credit also tells readers where an idea came from.

## Decision

Every adapted idea is credited where it lands and once centrally:

1. **Skill metadata:** each adapted skill carries a `credits` string, keeping the kit's rule that `metadata` values are strings.
2. **Skill body:** a renamed concept names its origin once.
3. **Near-verbatim passages:** a `CREDITS.md` goes in that skill's folder.
4. **Central notice:** `THIRD_PARTY_NOTICES.md` at the repo root holds both full MIT texts and the list of adapted skills. The npm package ships it, and the installer copies it next to installed skills.
5. **README:** an Acknowledgments section names both projects.
6. **Validation:** `ack-validate-skill` flags adapted material without a `credits` entry, and `ack-drift-control` keeps `THIRD_PARTY_NOTICES.md` in step with the skills that declare credits.

## Consequences

- Attribution is part of 2.0, not a follow-up.
- The skill template gains the `credits` metadata field.
- Generated manual-mode templates ([ADR-003](ADR-003-manual-mode-is-fully-supported.md)) carry OpenSpec's license header.

## Clarification (2026-11-22)

Point 4's "the installer copies it next to installed skills" was not implemented in 2.0.0 (found in review of the 2.0.0 release). From 2.0.1 the installer writes two files once into each tool's skills folder, as managed files recorded in the manifest: `ai-context-kit-LICENSE` (the kit's MIT license) and `ai-context-kit-THIRD_PARTY_NOTICES.md` (this repository's `THIRD_PARTY_NOTICES.md`). The names carry the kit's prefix because skills folders are shared with OpenSpec and other kits. The decision itself is unchanged.
