---
description: 'Generate personal user context instruction files for context-aware AI collaboration across all LLM providers (Claude, GPT, Gemini, Mistral, LM Studio, Ollama)'
agent: 'agent'
tools: ['search/codebase', 'edit/editFiles']
---

# Generate User Context Instructions File

## Mission

Generate a complete personal user context instruction file (`.instructions.md`) that provides AI assistants with context about your professional background, working style, and preferences. This file works across all LLM providers and forms the foundation for personalized AI collaboration.

## Scope & Preconditions

**Prerequisites:**
- User wants to create a personal user context for AI collaboration
- Repository follows the AI Context Kit system structure
- User is willing to share professional information (privacy-conscious approach)

**Target Output:**
- Single `.instructions.md` file in workspace root or designated location
- Follows YAML frontmatter requirements (applyTo, description)
- Contains 15 required sections covering identity, skills, preferences, and constraints
- Privacy-conscious with support for placeholders and anonymization
- Portable across Claude, GPT, Gemini, Mistral, LM Studio, and Ollama

## Inputs

**Required Information:**
Gather personal and professional details through systematic discovery phases. Respect privacy boundaries and offer placeholder options for sensitive information.

**Context Variables:**
- Reference existing examples in workspace via codebase search
- If `templates/usercontext_template.instructions.md` is missing, ask the user to paste or link the template
- Respect user's privacy preferences throughout the interview

**Privacy Guidelines:**
- Offer `[Your Name]`, `[Your Company]`, etc. placeholders for sensitive data
- Never pressure the user to share personal information
- Clearly explain what information is optional vs. required
- Suggest anonymization strategies when appropriate

## Workflow

Execute discovery in six phases. Complete each phase before proceeding to the next.

### Phase 1: Personal Identity & Professional Background

**Questions:**
1. What name would you like the AI to use when addressing you? (Can be first name, nickname, or placeholder like "[Your Name]")
2. What is your current professional role or title? (e.g., "Senior Software Engineer", "Freelance Developer", "Technical Lead")
3. What company or organization do you work for? (Can use placeholder like "[Your Company]" if preferred)
4. **[Optional]** Do you have independent/side work, consulting, or a business label?
   - If yes, what is the name and when was it founded?
   - What is your role in this independent work? (e.g., "Independent developer", "Consultant", "Content creator")
5. **[Optional]** Are you involved in content creation, speaking, or community activities?
   - If yes, what type? (e.g., "Technical blogging", "Conference speaking", "Open source maintainer", "YouTube tutorials")
6. What location or timezone are you in? (e.g., "Germany/CET", "US Pacific", or just timezone if privacy preferred)
7. What is your primary professional focus or specialty? (e.g., "iOS Development", "Cloud Architecture", ".NET Backend Development")
8. What technology ecosystem do you primarily work in? (e.g., "Apple/iOS", "Microsoft/.NET", "Web/JavaScript", "Cross-platform")
9. **[Optional]** Does your family or household use the same technology ecosystem? (This can affect project considerations)

**Extract:**
- Personal identifier for AI addressing
- Professional role and context (employment + indie/side work + content creation)
- Primary technical focus
- Working ecosystem
- Family/household technology context (if relevant)

---

### Phase 2: Technical Skills & Expertise

**Questions:**
1. What programming languages are you most proficient in? (Rank top 3-5)
2. What frameworks or platforms do you work with regularly? (e.g., SwiftUI, .NET, React, Django)
3. What development tools do you use daily? (IDEs, version control, CI/CD, etc.)
4. What architectural patterns or methodologies do you follow? (e.g., MVVM, Clean Architecture, TDD, DDD)
5. What areas of technology are you currently learning or exploring?
   - **[Optional]** What would you rate your current skill level in these areas? (beginner, learner, intermediate, proficient, expert)
6. What technical topics do you consider yourself an expert in?
7. What technical topics do you want to learn more about?
8. **[Optional]** Have you obtained any certifications or completed significant courses?
   - If yes, what certifications? (Include name, date obtained, and score if applicable)
   - Are you currently pursuing any certifications or courses?
9. **[Optional]** Do you speak languages other than English?
   - If yes, what languages and proficiency levels? (Include certifications if applicable, e.g., "Italian B1 certified")

**Extract:**
- Technical skills matrix (languages, frameworks, tools)
- Expertise areas and skill levels
- Learning objectives with current proficiency
- Architecture and methodology preferences
- Certifications with dates and scores
- Language skills (programming and human languages)

---

### Phase 3: Current Projects & Goals

**Questions:**
1. How many active projects are you currently managing? (2-5 is typical, but 6-10+ is fine for power users)
2. For each project:
   - What is the project name?
   - What is the project's purpose and target users?
   - What technology stack does it use?
   - What platforms does it target? (e.g., iOS, web, desktop, cross-platform)
   - What is the current status? (planning, active development, active migration, maintenance, ongoing evaluation)
   - What are the main challenges or focus areas?
   - **[Optional]** Is this an open source project? If yes, what is your goal for community engagement?
3. **[Optional]** Are you actively contributing to open source projects (other than your own)?
   - If yes, which projects and what is your contribution focus?
4. What are your professional goals for the next 6-12 months?
   - Break down by category if helpful: Technical Mastery, Project Completion, Professional Development, Content Creation, Open Source Contribution, etc.
5. What outcomes are you trying to achieve with AI assistance?
6. **[Optional]** Do any of your projects have family use cases or considerations?
   - If yes, which projects and what are the family-specific requirements?

**Extract:**
- Active projects list with comprehensive context (2-10+ projects)
- Open source projects and contribution goals
- Professional objectives categorized by type
- Specific areas where AI collaboration is most valuable
- Family context considerations for applicable projects

---

### Phase 4: Working Style & Preferences

**Questions:**
1. What file formats do you prefer for different types of work?
   - Documentation: (Markdown, Word, LaTeX, etc.)
   - Code: (Language-specific conventions, style guides)
   - Diagrams: (Mermaid, PlantUML, draw.io, etc.)
2. How do you prefer to organize your work?
   - Repository structure preferences
   - Folder naming conventions
   - File naming patterns
3. What is your typical workflow or development process?
   - Do you follow TDD, design-first, iterative prototyping, etc.?
   - How do you approach problem-solving? (e.g., structured and methodical, rapid prototyping, research-first)
4. **[Optional]** What are your Git commit preferences?
   - Do you prefer small, logical commits or larger feature commits?
   - Do you follow specific commit message conventions? (e.g., Conventional Commits, semantic commits)
5. **[Optional]** How do you balance speed vs. quality in your work?
   - Do you prioritize correctness and reproducibility over speed?
   - Or do you prefer rapid iteration with refinement later?
4. What are your quality standards?
   - Code coverage expectations
   - Code review practices
   - Testing requirements
5. What documentation style do you prefer?
   - Inline comments: minimal, detailed, or explanatory?
   - README structure: concise or comprehensive?
   - API documentation: JSDoc, XML comments, OpenAPI, etc.?
6. What values guide your development work?
   - Examples: clean code, maintainability, performance, security, user experience

**Extract:**
- Format preferences for output
- Organizational conventions
- Workflow and process details
- Quality standards and values
- Documentation preferences

---

### Phase 5: Communication & Collaboration Style

**Questions:**
1. What tone should the AI use when communicating with you?
   - Professional & Technical
   - Friendly & Conversational
   - Direct & Concise
   - Detailed & Explanatory
   - Other (specify)
2. How much explanation do you typically want?
   - High-level summaries
   - Balanced (overview + key details)
   - Comprehensive (full explanations)
   - Depends on the topic (specify preferences)
3. What technical terminology level is appropriate?
   - Expert (assume full knowledge)
   - Professional (explain advanced concepts)
   - Mixed (depends on topic)
4. How should the AI handle ambiguity in your requests?
   - Ask clarifying questions immediately
   - Make reasonable assumptions and confirm
   - Provide multiple interpretations
5. What context should the AI always remember or prioritize?
   - Current project focus
   - Time constraints
   - Quality standards
   - Learning goals
   - Other priorities

**Extract:**
- Communication tone and style
- Explanation depth preferences
- Terminology level
- Ambiguity handling approach
- Context prioritization rules

---

### Phase 6: Constraints & Limitations

**Questions:**
1. What time constraints do you typically work under?
   - Sprint-based development cycles
   - Deadline-driven projects
   - Flexible timeline
   - Other (specify)
2. What resource constraints should the AI be aware of?
   - Team size (solo, small team, large organization)
   - Budget considerations
   - Technology restrictions (locked to specific versions, platforms, etc.)
3. What technical constraints exist in your environment?
   - Legacy system compatibility
   - Platform requirements (iOS version, .NET version, browser support)
   - Performance requirements
   - Security/compliance requirements
4. What organizational constraints affect your work?
   - Company coding standards
   - Approval processes
   - Deployment procedures
   - Documentation requirements
5. What topics or approaches should the AI avoid?
   - Specific libraries or frameworks to avoid
   - Anti-patterns to never suggest
   - Prohibited practices
   - Off-topic areas

**Extract:**
- Time and schedule constraints
- Resource limitations
- Technical restrictions
- Organizational policies
- Exclusions and prohibitions

---

## Generation Rules

After gathering all information, generate the complete user context instruction file following these rules:

### YAML Frontmatter (Required)
```yaml
---
description: 'Personal AI collaboration context for {Name/Role} - {Primary Focus} ({Ecosystem})'
applyTo: "**/*"
---
```

### Required Sections (in order)

1. **User Context – {Name/Role}** (H1 heading)
2. **Professional Background** - Role, company, location, focus area
3. **Technical Expertise** - Languages, frameworks, tools, architecture
4. **Current Projects** - Active work with context
5. **Professional Goals** - Short-term and long-term objectives
6. **Working Style** - Workflow, process, problem-solving approach
7. **Format Preferences** - Documentation, code, diagrams
8. **Quality Standards** - Testing, code review, coverage expectations
9. **Documentation Preferences** - Comments, README, API docs
10. **Communication Style** - Tone, explanation depth, terminology
11. **Context Handling** - How to handle ambiguity and prioritize information
12. **Time & Schedule** - Working constraints, deadlines, availability
13. **Resource Constraints** - Team, budget, technology limitations
14. **Technical Constraints** - Platform, performance, security requirements
15. **Exclusions & Prohibitions** - What to avoid or never suggest

### Metadata Structure (Optional JSON block)
For advanced LLM integrations, include a structured JSON metadata block:
```json
{
  "user": {
    "name": "{Name}",
    "location": "{Location}",
    "role": "{Role}",
    "focus": "{Primary Focus}",
    "ecosystem": "{Technology Ecosystem}"
  },
  "employment": {
    "company": "{Company Name}",
    "position": "{Position}",
    "since": "{Year}"
  },
  "indie_business": {
    "label": "{Business Name}",
    "founded": "{Year}",
    "role": "{Role Description}"
  },
  "technical": {
    "languages": ["{Language1}", "{Language2}", "{Language3}"],
    "frameworks": ["{Framework1}", "{Framework2}"],
    "tools": ["{Tool1}", "{Tool2}"],
    "patterns": ["{Pattern1}", "{Pattern2}"],
    "certifications": ["{Cert1 with date and score}", "{Cert2 with date and score}"]
  },
  "projects": [
    {
      "name": "{Project Name}",
      "description": "{Brief description}",
      "platforms": ["{Platform1}", "{Platform2}"],
      "status": "{Status}",
      "open_source": "{true/false}"
    }
  ],
  "preferences": {
    "output_format": ["{Format1}", "{Format2}"],
    "workflow": ["{Step1}", "{Step2}", "{Step3}"],
    "style": ["{Style1}", "{Style2}"],
    "commit_workflow": "{Commit preference description}"
  },
  "communication": {
    "tone": ["{Tone1}", "{Tone2}"],
    "detail_level": "{Detail level preference}",
    "terminology": "{Terminology level}",
    "language": {
      "technical": "{Language for technical work}",
      "non_technical": "{Language for communication}"
    }
  },
  "goals": {
    "technical_mastery": "{Goal description}",
    "project_completion": "{Goal description}",
    "professional_development": "{Goal description}",
    "ai_expertise": "{Goal description}",
    "content_creation": "{Goal description}",
    "open_source": "{Goal description}",
    "code_quality": "{Goal description}"
  },
  "constraints": {
    "time": "{Time constraints description}",
    "skill_level": "{Current skill level in learning areas}",
    "platform": "{Platform constraints}",
    "language": "{Language constraints}",
    "infrastructure": "{Infrastructure constraints}",
    "family_context": "{Family considerations if applicable}"
  },
  "exclusions": {
    "technologies": ["{Tech1 to avoid}", "{Tech2 to avoid}"],
    "anti_patterns": ["{Anti-pattern1}", "{Anti-pattern2}"],
    "prohibited": ["{Prohibited practice1}", "{Prohibited practice2}"],
    "off_topic": ["{Off-topic area1}", "{Off-topic area2}"]
  }
}
```

### Formatting Standards
- Use H2 (`##`) for major sections
- Use H3 (`###`) for subsections
- Use bullet lists for skills, tools, and preferences
- Use tables for structured comparison data when appropriate
- Use code blocks for technical examples or command references
- Use bold for emphasis on key terms
- Include horizontal rules (`---`) between major sections

### Privacy Protection
- Use placeholders consistently: `[Your Name]`, `[Your Company]`, `[Your Location]`
- Anonymize specific project names if requested: `[Project A]`, `[Client Project]`
- Replace sensitive URLs or identifiers with generic descriptions
- Include a privacy notice in the generated file if placeholders are used

### Validation Checklist
Before presenting the generated file, verify:
- [ ] YAML frontmatter is present with `description` and `applyTo`
- [ ] All 15 required sections are present
- [ ] Personal identity information respects privacy preferences
- [ ] Dual professional contexts captured (if applicable: employment + indie work + content creation)
- [ ] Technical skills are comprehensive and current
- [ ] Certifications include dates and scores (if provided)
- [ ] Active projects include sufficient context (supports 2-10+ projects)
- [ ] Open source goals documented (if applicable)
- [ ] Working style and preferences are clearly stated (including commit workflow)
- [ ] Communication preferences are explicit
- [ ] Constraints are documented (time, resource, technical, organizational)
- [ ] Family context considerations noted (if applicable)
- [ ] Exclusions and prohibitions are listed
- [ ] JSON metadata block is valid (if included)
- [ ] Privacy placeholders are consistent throughout
- [ ] File follows markdown best practices

---

## Output Format

Present the complete user context instruction file as a single markdown code block with the filename:

````markdown
```markdown
<!-- Full generated content here -->
```

**Filename:** `{name}_usercontext.instructions.md` (e.g., `marco_usercontext.instructions.md`, `developer_usercontext.instructions.md`)
````

Then provide a summary:
```
✅ Generated personal user context instruction file for {Name/Role}

**Key Features:**
- Professional role: {Role} specializing in {Focus}
- Primary ecosystem: {Ecosystem}
- {Number} programming languages listed
- {Number} active projects documented
- Communication style: {Style}
- Privacy level: {Full disclosure / Partial anonymization / Fully anonymized}

**Next Steps:**
1. Save this file to your workspace root or designated user context location
2. Review privacy placeholders and replace with real information if comfortable
3. Update the Current Projects section as your work evolves
4. Load this file together with project-specific instruction files for complete AI context
5. Revisit and update this file every 3-6 months to keep it current

**Using This User Context:**
This file is portable across all LLM providers:
- GitHub Copilot: Load via `.github/instructions/` or workspace root
- Claude: Reference in project context or system prompts
- ChatGPT: Upload as a file or paste into Custom Instructions
- Gemini: Include in context window
- LM Studio: Load as system prompt
- Ollama: Use in modelfile SYSTEM directive
```

---

## Example Reference

If the user requests to see an example, reference these files in the repository (if present):
- `templates/usercontext_template.instructions.md` - Complete template structure
- Look for other `*_usercontext.instructions.md` files in the workspace
If these files are missing, ask the user to paste or link an example.

---

## Best Practices

1. **Respect Privacy** - Never pressure users to share sensitive information; always offer placeholders
2. **Be Thorough** - Ask follow-up questions if responses are vague or incomplete
3. **Adapt to Context** - Adjust questions based on the user's role (e.g., freelancer vs. enterprise developer, solo developer vs. team lead)
4. **Capture Dual Contexts** - Many professionals have both employment and indie/side work; capture both when present
5. **Support Power Users** - Some users manage 6-10+ projects; the user context should scale to their complexity
6. **Track Certifications** - Include dates and scores for certifications to show progression and achievement
7. **Document Open Source Goals** - If the user contributes to or maintains open source, capture their community engagement goals
8. **Focus on Actionability** - Capture information that will make AI assistance more effective
9. **Encourage Updates** - Remind users that this file should evolve with their career and projects
10. **Cross-Reference Projects** - Link user context to project-specific instruction files for complete context
11. **Validate Portability** - Ensure the generated file works across all LLM providers
12. **Balance Detail and Brevity** - Provide enough context without overwhelming the file
13. **Highlight Constraints** - Make limitations and exclusions prominent to prevent unwanted suggestions
14. **Include Examples** - When capturing preferences, use concrete examples to clarify expectations
15. **Consider Family Context** - For projects with family use cases, document those considerations

---

## Privacy Notice Template

If the user opts for placeholders, include this notice in the generated file:

```markdown
---

## Privacy Notice

This user context file uses placeholders to protect sensitive information:
- `[Your Name]` - Replace with your actual name if desired
- `[Your Company]` - Replace with your employer or organization
- `[Your Location]` - Replace with your city, country, or timezone
- `[Project Name]` - Replace with actual project names when sharing is appropriate

You can customize the level of detail based on where and how you use this file. For public repositories, consider keeping placeholders. For private or local use, you may replace them with actual information.

---
```

---

## Common User Personas (Roles)

Use these as reference points during the interview to help users articulate their user personas and working styles:

**The Solo Developer**
- Works independently or as a freelancer
- Needs broad technical knowledge
- Values efficiency and practical solutions
- Often juggles multiple projects

**The Enterprise Engineer**
- Works in large organization with established processes
- Follows strict coding standards and compliance requirements
- Collaborates extensively with team
- Focused on maintainability and long-term support

**The Startup Builder**
- Fast-paced, rapidly changing requirements
- Balances speed with quality
- Wears multiple hats (dev, DevOps, architecture)
- Innovation-focused with pragmatic constraints

**The Specialist**
- Deep expertise in specific domain (e.g., iOS, machine learning, security)
- Values precision and best practices in their specialty
- Keeps up with latest advances in their field
- Contributes to or maintains specialized libraries/frameworks

**The Team Lead**
- Balances hands-on coding with leadership
- Emphasizes code review and mentoring
- Focuses on architectural decisions and technical direction
- Concerned with team velocity and knowledge sharing

**The Open Source Contributor**
- Works on public projects with diverse contributors
- Values documentation and community engagement
- Follows established project conventions closely
- Emphasizes backward compatibility and comprehensive testing

---

© 2025 – AI Context Kit contributors
