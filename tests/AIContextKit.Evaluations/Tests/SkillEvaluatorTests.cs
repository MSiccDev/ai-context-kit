using System.Runtime.CompilerServices;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;
using Microsoft.Extensions.Configuration;
using OllamaSharp;
using AIContextKit.Evaluations;
using AIContextKit.Evaluations.Evaluators;
using Xunit;

namespace AIContextKit.Evaluations.Tests;

public class SkillEvaluatorTests
{
    // Judge config: user secrets, then environment variables of the same name. See OllamaJudgeSettings
    // and README "Configuring the judge model".
    private static readonly IConfiguration Configuration = new ConfigurationBuilder()
        .AddUserSecrets<SkillEvaluatorTests>(optional: true)
        .AddEnvironmentVariables()
        .Build();

    // One judge client for the whole class. Lazy so a missing config key surfaces as
    // OllamaJudgeSettings' message on first use, not a TypeInitializationException.
    private static readonly Lazy<IChatClient> JudgeClient = new(() =>
    {
        var settings = OllamaJudgeSettings.FromConfiguration(Configuration);
        var httpClient = new HttpClient { BaseAddress = settings.Endpoint, Timeout = settings.Timeout };
        return new OllamaApiClient(httpClient, defaultModel: settings.Model);
    });

    // Grade bands from scoring.md.
    private static string GradeBand(double totalScoreOn100) => totalScoreOn100 switch
    {
        >= 90 => "PASS",
        >= 75 => "PASS WITH WARNINGS",
        >= 60 => "PASS WITH WARNINGS (Needs Improvement)",
        _ => "FAIL"
    };

    // Runs both evaluators over one SKILL.md and recombines the metrics into a 0-100 score:
    // structural (Phases 1+2+4) and quality (Phases 3+5), weighted per ScoringRubric.
    private static async Task<(double TotalOn100, string Band, string Diagnostics)> EvaluateFullPipelineAsync(
        string skillPath, string folderName, [CallerMemberName] string scenarioName = "")
    {
        var chatConfiguration = new ChatConfiguration(JudgeClient.Value);

        await using var scenarioRun = await EvaluationHarness.CreateScenarioRunAsync(
            scenarioName: scenarioName,
            evaluators: [new SkillStructuralEvaluator(), new SkillQualityEvaluator()],
            chatConfiguration: chatConfiguration);

        var (messages, response, context) = await EvaluationInputs.ForSkillAsync(skillPath, folderName);

        EvaluationResult result = await scenarioRun.EvaluateAsync(messages, response, context);

        var structuralMetric = result.Get<NumericMetric>(SkillStructuralEvaluator.MetricName);
        var qualityMetric = result.Get<NumericMetric>(SkillQualityEvaluator.MetricName);
        double structural01 = structuralMetric.Value ?? 0.0;
        double quality01 = qualityMetric.Value ?? 0.0;

        double totalOn100 = (structural01 * ScoringRubric.StructuralPoints) + (quality01 * ScoringRubric.QualityPoints);
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
        var (totalOn100, band, diagnostics) = await EvaluateFullPipelineAsync(
            "TestData/skills/well-formed-example/SKILL.md", "well-formed-example");

        Assert.True(totalOn100 >= 75,
            $"Expected PASS or PASS WITH WARNINGS, got {band} ({totalOn100:F1}/100). {diagnostics}");
    }

    [Fact]
    [Trait("Category", "Slow")]
    public async Task MalformedSkill_FailsValidation()
    {
        var (totalOn100, band, diagnostics) = await EvaluateFullPipelineAsync(
            "TestData/skills/malformed-example/SKILL.md", "malformed-example");

        Assert.True(totalOn100 < 75,
            $"Expected FAIL or PASS WITH WARNINGS (Needs Improvement), got {band} ({totalOn100:F1}/100). {diagnostics}");
    }
}