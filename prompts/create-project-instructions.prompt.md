---
description: 'Generate spec-compliant project instruction files for context-aware AI collaboration following the Context-Aware AI Session Flow Specification v1.2'
agent: 'agent'
tools: ['search/codebase', 'edit/editFiles']
---

# Generate Project Instructions File

## Mission

Generate a complete, spec-compliant project instruction file (`.instructions.md`) that enables consistent, context-aware AI collaboration following the **Context-Aware AI Session Flow Specification v1.2**.

## Scope & Preconditions

**Prerequisites:**
- User has an active project requiring AI collaboration context
- Repository follows the persona template system structure
- Specification file exists at `specs/context_aware_ai_session_spec.md`

**Target Output:**
- Single `.instructions.md` file in `projects/` directory
- Follows YAML frontmatter requirements (name, description, applyTo)
- Contains all 17 required sections per specification v1.2
- Includes role definitions, session state model, and command reference

## Inputs

**Required Information:**
Gather project details through systematic discovery phases. Request clarification when responses are vague or incomplete.

**Context Variables:**
- Reference existing examples in `projects/` directory via codebase search
- Access specification at `specs/context_aware_ai_session_spec.md` for validation
- Check templates in `templates/project_template.instructions.md` for structure

## Workflow

Execute discovery in seven phases. Complete each phase before proceeding to the next.

### Phase 1: Project Identity & Overview

**Questions:**
1. What is your project name? (e.g., "TwistReader", "E-Commerce API")
2. Provide a one-paragraph description of what the project does and who it's for
3. What is the current project phase?
   - Planning (requirements and design)
   - Active Development (implementation)
   - Maintenance (bug fixes and updates)
   - Other (please specify)
4. What are the 3-4 primary goals for this project?

**Extract:**
- Project name for filename generation (`{project_name}_project.instructions.md`)
- Project description for overview section
- Current phase for default session state
- Primary objectives

---

### Phase 2: Technical Stack & Architecture

**Questions:**
1. What programming language(s) does your project use? (e.g., Swift, C#, TypeScript, Python)
2. What frameworks or libraries are core to your project? (e.g., SwiftUI, .NET 8, React, Django)
3. What architecture pattern do you follow? (e.g., MVVM, Clean Architecture, Microservices, TDD)
4. What persistence/storage solution do you use? (e.g., SwiftData, PostgreSQL, MongoDB, filesystem)
5. What testing frameworks do you use? (e.g., xUnit, Jest, pytest, XCTest)
6. What documentation approach do you follow? (e.g., Markdown, arc42, JSDoc, inline comments)
7. What is your repository structure? Provide key folders (e.g., `src/`, `tests/`, `docs/`)

**Extract:**
- Complete tech stack section
- Repository structure diagram
- Build/testing commands

---

### Phase 3: Role Definitions

**Questions:**
1. What roles would be most useful for working on this project? Select 3-5 from these common options or suggest your own:
   - **Software Architect** - Design, architecture, system integration
   - **[Language] Developer** - Implementation, coding, testing (e.g., ".NET Developer", "Swift Developer")
   - **Test Engineer** - QA, test design, coverage
   - **Technical Writer** - Documentation, guides, examples
   - **DevOps Engineer** - CI/CD, deployment, infrastructure
   - **UI/UX Designer** - Interface design, user experience
   - **Code Reviewer** - Quality assessment, validation
   - **Database Engineer** - Schema design, query optimization
   - **Security Engineer** - Security analysis, vulnerability assessment
   - **Performance Engineer** - Optimization, profiling
   - Custom roles (specify)

2. For each selected role, what are the 3-5 key responsibilities?

**Extract:**
- Role definitions table with:
  - Role name
  - When to use
  - Assistant behavior
  - Typical outputs

---

### Phase 4: Default Session State

**Questions:**
1. What should be the **default role** when starting work on this project? (from roles defined above)
2. What **default phase** represents the current work stage?
   - Planning, Active Development, Maintenance, Testing, Debugging, Review, Documentation
3. What **output style** do you prefer by default?
   - Structured Technical (Markdown with rationale and examples)
   - Minimal Code (code only, minimal explanation)
   - Detailed (comprehensive explanations)
   - Annotated (code with inline comments)
4. What **tone** should the AI use?
   - Professional & Technical (clear, precise, collaborative)
   - Direct & Concise (minimal fluff)
   - Detailed & Explanatory (thorough explanations)
   - Friendly & Encouraging (supportive)
5. What **interaction mode** works best?
   - Advisory (propose solutions, await confirmation)
   - Pair Programming (collaborative, iterative)
   - Driver (execute autonomously, report results)

**Extract:**
- Complete Default Session State table
- Examples of how to modify state during work

---

### Phase 5: Development Principles & Practices

**Questions:**
1. What are your core development principles? (e.g., TDD first, Clean Architecture, Performance First)
2. What coding standards or conventions must be followed? (e.g., naming conventions, comment style)
3. What quality standards do you maintain? (e.g., test coverage %, code review requirements)
4. What security or compliance requirements exist?
5. Are there any specific patterns or anti-patterns to follow/avoid?

**Extract:**
- Development Principles section
- Repository Context notes
- Working Together guidelines

---

### Phase 6: Current Objectives & Future Plans

**Questions:**
1. What are the immediate objectives for this project? (3-5 current goals)
2. What features or improvements are planned for the future?
3. Are there any deferred features or technical debt to track?
4. What maintenance priorities exist?

**Extract:**
- Current Objectives section
- Future Roadmap section

---

### Phase 7: Key Components & Documentation

**Questions:**
1. What are the major components or modules in your project? (e.g., "MCP Server with 14 tools", "Authentication Service", "Data Layer")
2. What testing strategy do you follow? (unit, integration, e2e, coverage targets)
3. What documentation already exists? (README, API docs, architecture docs)
4. What are the most common commands for working with this project? (build, test, run, deploy)

**Extract:**
- Key Components section
- Testing Strategy section
- Documentation Standards section
- Testing Commands section
- Related Files section

---

## Generation Rules

After gathering all information, generate the complete project instruction file following these rules:

### YAML Frontmatter (Required)
```yaml
---
name: {project-name-slug}  # lowercase, hyphens only (e.g., "my-app", "my-aweosome-api")
description: Project-specific instructions for {Project Name} (v{version}, spec v1.2, updated {date})
applyTo: "**/*"
---
```

### Required Sections (in order)
1. **Project Context – {Project Name}** (H1 heading)
2. **Session Prerequisites** - Context hierarchy and spec reference
3. **Overview** - Project description and current status
4. **Default Session State** - Table with all session elements
5. **State Management & Control** - Context visibility, transitions, commands
6. **Role Definitions** - Table with roles, use cases, behaviors, outputs
7. **Tech Stack** - Languages, frameworks, architecture, repo structure
8. **Current Objectives** - Phase-aligned goals
9. **Development Principles** - Core practices and standards
10. **Repository Context** - Branch info, paths, configuration
11. **Working Together** - Task patterns for each role with examples
12. **Key Components** - Major modules/services with details
13. **Testing Strategy** - Approach, organization, coverage
14. **Documentation Standards** - Types and formats
15. **Testing Commands** - Practical command examples
16. **Related Files** - Cross-references
17. **Future Roadmap** - Planned features and maintenance

### Command Reference Template
Include this standard command table:
```markdown
| Command | Parameters | Description | Example |
|---------|-----------|-------------|---------|
| `/tag.context` | — | Display current session state | `/ack.context` |
| `/tag.mode [role]` | Role names (lowercase) | Switch assistant role | `/ack.mode developer` |
| `/tag.phase [name]` | Phase names (lowercase) | Update work phase | `/ack.phase testing` |
| `/tag.style [type]` | `structured` \| `minimal` \| `detailed` \| `annotated` | Change output verbosity | `/ack.style minimal` |
| `/tag.tone [style]` | `technical` \| `direct` \| `detailed` \| `concise` | Adjust communication tone | `/ack.tone concise` |
| `/tag.interact [mode]` | `advisory` \| `pair` \| `driver` | Set collaboration style | `/ack.interact pair` |
| `/tag.reset` | — | Clear session state (keeps user context & project) | `/ack.reset` |
```

### Role Definition Table Template
For each role, provide:
```markdown
| Role | When to Use | Assistant Behavior | Typical Outputs |
|------|-------------|-------------------|-----------------|
| **{Role Name}** | {Scenarios for using this role} | {How assistant behaves in this role} | {Types of outputs produced} |
```

### Example Task Patterns Template
For each role, provide 3-5 example requests:
```markdown
**{Role Name} ({Role Mode}):**
- *"Example request 1"*
- *"Example request 2"*
- *"Example request 3"*
```

### Formatting Standards
- Use H2 (`##`) for major sections
- Use H3 (`###`) for subsections
- Use tables for structured data (Session State, Roles, Commands)
- Use code blocks with language tags for commands and examples
- Use bold for emphasis on key terms
- Use italics for example natural language commands
- Include horizontal rules (`---`) between major sections

### Validation Checklist
Before presenting the generated file, verify:
- [ ] YAML frontmatter uses only supported attributes (`name`, `description`, `applyTo`)
- [ ] `name` attribute uses lowercase with hyphens/underscores/periods only
- [ ] All required sections are present in correct order
- [ ] Default Session State table includes all 6 elements (Project, Role, Phase, Output Style, Tone, Interaction Mode)
- [ ] At least 3 roles are defined with complete details
- [ ] Command reference table is included
- [ ] Example task patterns are provided for each role
- [ ] Role transition examples use both natural language and `/tag.mode` commands
- [ ] Testing commands are practical and executable
- [ ] Repository context includes default branch and key paths
- [ ] Future roadmap distinguishes between planned features and maintenance
- [ ] Copyright footer is included

---

## Output Format

Present the complete project instruction file as a single markdown code block with the filename as the block label:

````markdown
```markdown
<!-- Full generated content here -->
```

**Filename:** `projects/{project_name}_project.instructions.md`
````

Then provide a summary:
```
✅ Generated project instruction file for {Project Name}

**Key Features:**
- {Number} role definitions
- Default session state configured for {Phase} phase
- Supports {Number} phases: {list}
- Includes {Number} testing commands
- References {Number} related files

**Next Steps:**
1. Save this file to `projects/{project_name}_project.instructions.md`
2. Review and customize role definitions for your specific needs
3. Update the Current Objectives section as the project evolves
4. Load this file together with your personal user context instructions for complete AI context
```

---

## Example Reference

If the user requests to see an example, reference these files in the repository:
- `templates/project_template.instructions.md` - Complete template structure
- Look for `*_project.instructions.md` files in the `projects/` directory

---

## Best Practices

1. **Be thorough in discovery** - Ask clarifying questions if responses are vague
2. **Adapt role suggestions** - Recommend roles that make sense for the specific tech stack
3. **Provide realistic defaults** - Default session state should match the current project phase
4. **Include actionable examples** - Example task patterns should be specific to the project
5. **Cross-reference documentation** - Link to existing specs, READMEs, and architecture docs
6. **Future-proof the structure** - Include Future Roadmap even if it's minimal
7. **Follow spec v1.2** - Ensure all session state elements and transition rules are included

---

© 2025 – AI Context Kit contributors
