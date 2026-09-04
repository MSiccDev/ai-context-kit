using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;

namespace AIContextKit.Evaluations.Evaluators;

public class AgentsMdStructuralCompletenessEvaluator : IEvaluator
{
    public const string MetricName = "StructuralCompleteness";
    public IReadOnlyCollection<string> EvaluationMetricNames => [MetricName];

    public static readonly IReadOnlyList<string> RequiredFields = new List<string>
    {
        "## Purpose",
        "## Source Of Truth And Precedence",
        "## Repository Map",
        "## Scope And Precedence For AGENTS.md Files",
        "## Session-State Contract",
        "## Command Namespace Policy",
        "## Repository Project Context",
        "## Formatting And Path Stability Rules",
        "## Update And Drift-Control Rule",
        "## Key References"
    };

    ValueTask<EvaluationResult> IEvaluator.EvaluateAsync(
        IEnumerable<ChatMessage> messages,
        ChatResponse modelResponse,
        ChatConfiguration? chatConfiguration,
        IEnumerable<EvaluationContext>? additionalContext,
        CancellationToken cancellationToken)
    {
        var agentsMd = File.ReadAllText(FindAgentsMdPath());

        return ValueTask.FromResult(new EvaluationResult(Evaluate(agentsMd)));
    }

    public static BooleanMetric Evaluate(string agentsMd)
    {
        var missingFields = RequiredFields.Where(field => !agentsMd.Contains(field)).ToList();

        var reason = missingFields.Count == 0
            ? "All required fields are present in AGENTS.md."
            : $"{missingFields.Count} required field(s) missing from AGENTS.md: {string.Join(", ", missingFields)}";

        return new BooleanMetric(MetricName, value: missingFields.Count == 0, reason: reason);
    }

    public static string FindAgentsMdPath()
    {
        var directory = new DirectoryInfo(AppContext.BaseDirectory);

        while (directory is not null)
        {
            // A `.git` entry (directory, or a file for worktrees/submodules) marks the
            // repository root unambiguously -- unlike "first AGENTS.md found while
            // walking up", which would silently pick a nested AGENTS.md (e.g. a future
            // tests/AGENTS.md) instead of the root file this evaluator is meant to check.
            if (Directory.Exists(Path.Combine(directory.FullName, ".git")) ||
                File.Exists(Path.Combine(directory.FullName, ".git")))
            {
                var candidate = Path.Combine(directory.FullName, "AGENTS.md");
                if (File.Exists(candidate))
                {
                    return candidate;
                }

                throw new FileNotFoundException($"Repository root '{directory.FullName}' was found but has no AGENTS.md.");
            }

            directory = directory.Parent;
        }

        throw new FileNotFoundException("Could not locate the repository root (no '.git' found in any parent directory of the test output).");
    }
}
