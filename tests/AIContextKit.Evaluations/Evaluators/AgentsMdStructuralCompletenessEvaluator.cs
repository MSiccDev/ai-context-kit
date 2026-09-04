using System.Text.RegularExpressions;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;

namespace AIContextKit.Evaluations.Evaluators;

public partial class AgentsMdStructuralCompletenessEvaluator : IEvaluator
{
    public const string MetricName = "StructuralCompleteness";
    public IReadOnlyCollection<string> EvaluationMetricNames => [MetricName];

    [GeneratedRegex(@"^## .+$", RegexOptions.Multiline)]
    private static partial Regex SectionHeadingRegex();

    // Derived from templates/AGENTS_template.md rather than hardcoded, so this evaluator
    // can't drift out of sync with the canonical template it's meant to enforce.
    public static readonly IReadOnlyList<string> RequiredFields = LoadRequiredFieldsFromTemplate();

    ValueTask<EvaluationResult> IEvaluator.EvaluateAsync(
        IEnumerable<ChatMessage> messages,
        ChatResponse modelResponse,
        ChatConfiguration? chatConfiguration,
        IEnumerable<EvaluationContext>? additionalContext,
        CancellationToken cancellationToken)
    {
        // Content comes from the response; locating and reading AGENTS.md is the caller's job.
        return ValueTask.FromResult(new EvaluationResult(Evaluate(modelResponse.Text ?? string.Empty)));
    }

    private static BooleanMetric Evaluate(string agentsMd)
    {
        var missingFields = RequiredFields.Where(field => !agentsMd.Contains(field)).ToList();

        var reason = missingFields.Count == 0
            ? "All required fields are present in AGENTS.md."
            : $"{missingFields.Count} required field(s) missing from AGENTS.md: {string.Join(", ", missingFields)}";

        return new BooleanMetric(MetricName, value: missingFields.Count == 0, reason: reason);
    }

    public static string FindAgentsMdPath()
    {
        var repositoryRoot = FindRepositoryRoot();
        var candidate = Path.Combine(repositoryRoot, "AGENTS.md");
        if (File.Exists(candidate))
        {
            return candidate;
        }

        throw new FileNotFoundException($"Repository root '{repositoryRoot}' was found but has no AGENTS.md.");
    }

    private static IReadOnlyList<string> LoadRequiredFieldsFromTemplate()
    {
        var templatePath = Path.Combine(FindRepositoryRoot(), "templates", "AGENTS_template.md");
        var template = File.ReadAllText(templatePath);

        var headings = SectionHeadingRegex().Matches(template)
            .Select(m => m.Value.TrimEnd())
            .ToList();

        if (headings.Count == 0)
        {
            throw new InvalidOperationException($"No '## ' section headings found in template '{templatePath}'.");
        }

        return headings;
    }

    // A `.git` entry (directory, or a file for worktrees/submodules) marks the repository
    // root unambiguously -- unlike "first AGENTS.md found while walking up", which would
    // silently pick a nested AGENTS.md (e.g. a future tests/AGENTS.md) instead of the root
    // file this evaluator is meant to check.
    private static string FindRepositoryRoot()
    {
        var directory = new DirectoryInfo(AppContext.BaseDirectory);

        while (directory is not null)
        {
            if (Directory.Exists(Path.Combine(directory.FullName, ".git")) ||
                File.Exists(Path.Combine(directory.FullName, ".git")))
            {
                return directory.FullName;
            }

            directory = directory.Parent;
        }

        throw new FileNotFoundException("Could not locate the repository root (no '.git' found in any parent directory of the test output).");
    }
}
