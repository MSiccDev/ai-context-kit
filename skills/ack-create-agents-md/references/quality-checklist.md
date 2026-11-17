# Quality Checklist: ack-create-agents-md

## Both modes
- [ ] The mode matches the target path, or the user chose it explicitly.
- [ ] `<!-- spec_version: 2.0.0-beta.1 -->` is at the top.
- [ ] Every relative link and path resolves.
- [ ] Wording is provider-neutral, with no copied specification text.
- [ ] The artifact block and completion summary are present.

## Root mode
- [ ] All eleven sections of `root-schema.md` are present, in order.
- [ ] Scope And Precedence For AGENTS.md Files states all four rules.
- [ ] The Default State table has all six elements.
- [ ] The command namespace and namespaced command reference are complete.
- [ ] Spec-Driven Change Workflow names the OpenSpec root (or "not yet initialised"), the active change and the minimum version, has all four No Change, No Code rules, and has an invocation table.
- [ ] Repository Project Context has all twelve subsections, with at least 3 roles.
- [ ] The drift-control rule lists the dependent artifacts.

## Nested mode
- [ ] A root `AGENTS.md` exists.
- [ ] All five sections of `nested-schema.md` are present, in order.
- [ ] Each override names the root rule it refines.
- [ ] No root content is repeated.
- [ ] Key References links to the root `AGENTS.md`.
