using System.Text.RegularExpressions;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;

namespace AIContextKit.Evaluations.Evaluators;

/// <summary>
/// Non-AI evaluator reproducing validate-skill's Phase 1, 2, and 4 checks —
/// the deterministic <see cref="ScoringRubric.StructuralPoints"/> of
/// <see cref="ScoringRubric.TotalPoints"/> in scoring.md. No LLM call, no
/// ChatConfiguration dependency: pure text/regex logic against the SKILL.md
/// content, mirroring exactly what a human running validate-skill manually
/// would check first.
/// </summary>
public sealed partial class SkillStructuralEvaluator : IEvaluator
{
    public const string MetricName = "SkillStructuralScore"; // 0.0-1.0, normalized over ScoringRubric.StructuralPoints

    public IReadOnlyCollection<string> EvaluationMetricNames => [MetricName];

    [GeneratedRegex(@"^---\s*\n(.*?)\n---", RegexOptions.Singleline)]
    private static partial Regex FrontmatterBlockRegex();

    [GeneratedRegex(@"^\s*name\s*:", RegexOptions.Multiline)]
    private static partial Regex NamePresenceRegex();

    [GeneratedRegex(@"^\s*description\s*:", RegexOptions.Multiline)]
    private static partial Regex DescriptionPresenceRegex();

    [GeneratedRegex(@"^\s*name\s*:\s*[""']?([^""'\n]+)[""']?", RegexOptions.Multiline)]
    private static partial Regex NameValueRegex();

    [GeneratedRegex(@"^\s*description\s*:\s*[""']?([^""'\n]+)[""']?", RegexOptions.Multiline)]
    private static partial Regex DescriptionValueRegex();

    [GeneratedRegex(@"^[a-z0-9]+(-[a-z0-9]+)*$")]
    private static partial Regex KebabCaseRegex();

    [GeneratedRegex(@"https?://[^\s)\]]+")]
    private static partial Regex ExternalUrlRegex();

    public ValueTask<EvaluationResult> EvaluateAsync(
        IEnumerable<ChatMessage> messages,
        ChatResponse modelResponse,
        ChatConfiguration? chatConfiguration = null, // unused — this evaluator makes no LLM call
        IEnumerable<EvaluationContext>? additionalContext = null,
        CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        string content = modelResponse.Text ?? string.Empty;
        var findings = new List<string>(); // point-affecting issues — drive the score and the reason
        var notes = new List<string>();    // non-scoring observations — attached as informational diagnostics

        // ---- Phase 1: Presence, Structure, Frontmatter ----
        double phase1 = ScorePhase1(content, findings);

        // ---- Phase 2: Field Constraints And Naming Parity ----
        string? folderName = additionalContext?
            .OfType<SkillFolderContext>()
            .FirstOrDefault()?.FolderName;
        double phase2 = ScorePhase2(content, folderName, findings, notes);

        // ---- Phase 4: Resource References And Safety ----
        double phase4 = ScorePhase4(content, findings);

        double totalPoints = phase1 + phase2 + phase4;
        double normalized = totalPoints / ScoringRubric.StructuralPoints;

        var metric = new NumericMetric(MetricName, normalized);
        metric.Interpretation = new EvaluationMetricInterpretation(
            rating: ScoringRubric.RatingFromScore(normalized),
            reason: findings.Count == 0
                ? "All structural checks passed."
                : string.Join("; ", findings));

        foreach (string note in notes)
        {
            metric.AddDiagnostics(EvaluationDiagnostic.Informational(note));
        }

        return new ValueTask<EvaluationResult>(new EvaluationResult(metric));
    }

    private static double ScorePhase1(string content, List<string> findings)
    {
        double points = ScoringRubric.Phase1PresenceStructureFrontmatter;

        if (string.IsNullOrWhiteSpace(content))
        {
            findings.Add("SKILL.md content is empty");
            return 0.0;
        }

        var frontmatterMatch = FrontmatterBlockRegex().Match(content);
        if (!frontmatterMatch.Success)
        {
            findings.Add("no valid YAML frontmatter block found");
            return 0.0; // everything else in Phase 1 depends on frontmatter existing
        }

        string frontmatter = frontmatterMatch.Groups[1].Value;

        bool hasName = NamePresenceRegex().IsMatch(frontmatter);
        bool hasDescription = DescriptionPresenceRegex().IsMatch(frontmatter);

        if (!hasName) { findings.Add("missing required 'name' field"); points -= 10; }
        if (!hasDescription) { findings.Add("missing required 'description' field"); points -= 10; }

        return Math.Max(points, 0.0);
    }

    private static double ScorePhase2(string content, string? folderName, List<string> findings, List<string> notes)
    {
        double points = ScoringRubric.Phase2FieldConstraintsNamingParity;

        var nameMatch = NameValueRegex().Match(content);
        var descriptionMatch = DescriptionValueRegex().Match(content);

        if (nameMatch.Success)
        {
            string name = nameMatch.Groups[1].Value.Trim();

            // name format constraint: lowercase kebab-case
            if (!KebabCaseRegex().IsMatch(name))
            {
                findings.Add($"name '{name}' does not follow kebab-case convention");
                points -= 8;
            }

            // folder-name parity — this is exactly why SkillFolderContext exists
            if (folderName is not null && !string.Equals(name, folderName, StringComparison.Ordinal))
            {
                findings.Add($"name '{name}' does not match folder name '{folderName}'");
                points -= 8;
            }
            else if (folderName is null)
            {
                notes.Add("folder-name parity not checked — no SkillFolderContext supplied");
            }
        }

        if (descriptionMatch.Success)
        {
            string description = descriptionMatch.Groups[1].Value.Trim();
            if (description.Length < 20)
            {
                findings.Add("description is too short to convey clear triggering criteria");
                points -= 9;
            }
        }

        return Math.Max(points, 0.0);
    }

    private static double ScorePhase4(string content, List<string> findings)
    {
        double points = ScoringRubric.Phase4ResourceReferencesSafety;

        // Resource references should be relative, not absolute URLs to external hosts —
        // this check mirrors the toolkit's own provider-neutrality/portability concerns.
        // Matches both Markdown link syntax (]\(url\)) and bare URLs in prose — a
        // SKILL.md can reference an external host either way, and only matching the
        // Markdown-link form let bare URLs slip through undetected.
        var externalUrls = ExternalUrlRegex().Matches(content)
            .Select(m => m.Value.TrimEnd('.', ',', ';', ':'))
            .Distinct();

        foreach (string target in externalUrls)
        {
            // External links aren't automatically wrong, but flag for manual review —
            // extend this with an allowlist if your skills legitimately link externally.
            findings.Add($"external reference found: {target} (verify this is intentional)");
            points -= 3;
        }

        return Math.Max(points, 0.0);
    }
}
