using System.Runtime.CompilerServices;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;
using OllamaSharp;
using AIContextKit.Evaluations.Evaluators;
using Xunit;

namespace AIContextKit.Evaluations.Tests;

public class SkillEvaluatorTests
{
    private static IChatClient CreateOllamaClient() =>
        new OllamaApiClient(
            new HttpClient
            {
                BaseAddress = new Uri("http://localhost:11434"),
                Timeout = TimeSpan.FromMinutes(10),
            },
            defaultModel: "phi4-reasoning:14b-plus-q8_0");

    // Mirrors scoring.md's grade bands exactly, so this stays your single source
    // of truth for what PASS/WARN/FAIL means — same as validate-skill itself would report.
    private static string GradeBand(double totalScoreOn100) => totalScoreOn100 switch
    {
        >= 90 => "PASS",
        >= 75 => "PASS WITH WARNINGS",
        >= 60 => "PASS WITH WARNINGS (Needs Improvement)",
        _ => "FAIL"
    };

    // Runs both evaluators over one SKILL.md through a DiskBasedReportingConfiguration
    // (matching AgentsMdStructuralCompletenessTests' pattern) and reproduces scoring.md
    // exactly: Phases 1+2+4 (structural) = 60 pts, Phases 3+5 (quality) = 40 pts.
    private static async Task<(double TotalOn100, string Band, string Diagnostics)> EvaluateSkillAsync(
        string skillPath, string folderName, [CallerMemberName] string scenarioName = "")
    {
        var chatConfiguration = new ChatConfiguration(CreateOllamaClient());

        await using var scenarioRun = await EvaluationHarness.CreateScenarioRunAsync(
            scenarioName: scenarioName,
            evaluators: [new SkillStructuralEvaluator(), new SkillQualityEvaluator()],
            chatConfiguration: chatConfiguration);

        string skillText = await File.ReadAllTextAsync(skillPath);
        var messages = new[] { new ChatMessage(ChatRole.User, "Validate this SKILL.md.") };
        var response = new ChatResponse(new ChatMessage(ChatRole.Assistant, skillText));
        var context = new EvaluationContext[] { new SkillFolderContext(folderName) };

        EvaluationResult result = await scenarioRun.EvaluateAsync(messages, response, context);

        var structuralMetric = result.Get<NumericMetric>(SkillStructuralEvaluator.MetricName);
        var qualityMetric = result.Get<NumericMetric>(SkillQualityEvaluator.MetricName);
        double structural01 = structuralMetric.Value ?? 0.0;
        double quality01 = qualityMetric.Value ?? 0.0;

        double totalOn100 = (structural01 * 60) + (quality01 * 40);
        string band = GradeBand(totalOn100);
        string diagnostics =
            $"Structural: {structuralMetric.Interpretation?.Reason}. " +
            $"Quality: {qualityMetric.Interpretation?.Reason}";

        return (totalOn100, band, diagnostics);
    }

    [Fact]
    [Trait("Category", "Slow")]
    public async Task WellFormedSkill_PassesValidation()
    {
        var (totalOn100, band, diagnostics) = await EvaluateSkillAsync(
            "TestData/skills/well-formed-example/SKILL.md", "well-formed-example");

        Assert.True(totalOn100 >= 75,
            $"Expected PASS or PASS WITH WARNINGS, got {band} ({totalOn100:F1}/100). {diagnostics}");
    }

    [Fact]
    [Trait("Category", "Slow")]
    public async Task MalformedSkill_FailsValidation()
    {
        var (totalOn100, band, diagnostics) = await EvaluateSkillAsync(
            "TestData/skills/malformed-example/SKILL.md", "malformed-example");

        Assert.True(totalOn100 < 75,
            $"Expected FAIL or PASS WITH WARNINGS (Needs Improvement), got {band} ({totalOn100:F1}/100). {diagnostics}");
    }
}