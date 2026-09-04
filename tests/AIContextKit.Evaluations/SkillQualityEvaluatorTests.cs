using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;
using AIContextKit.Evaluations.Evaluators;

namespace AIContextKit.Evaluations.Tests;

// Offline tests of SkillQualityEvaluator's judge-response handling, using a canned IChatClient
// instead of a live Ollama model. The slow SkillEvaluatorTests covers the real judge path.
public class SkillQualityEvaluatorTests
{
    private const string SkillText = "---\nname: example\ndescription: a description long enough to be meaningful\n---\n\n# Example";

    [Fact]
    public async Task UnparseableJudgeResponse_ScoresZeroWithErrorDiagnostic_DoesNotThrow()
    {
        var metric = await EvaluateAsync("I think this skill looks pretty solid, nice work!");

        Assert.Equal(0.0, metric.Value);
        Assert.Equal(EvaluationRating.Poor, metric.Interpretation?.Rating);
        Assert.NotNull(metric.Diagnostics);
        Assert.Contains(metric.Diagnostics!, d => d.Severity == EvaluationDiagnosticSeverity.Error);
        Assert.Contains("Could not parse a SCORE", string.Join("\n", metric.Diagnostics!.Select(d => d.Message)));
    }

    [Fact]
    public async Task WellFormedJudgeResponse_ParsesScoreAndReason()
    {
        var metric = await EvaluateAsync("SCORE: 0.83\nREASON: Both phases pass cleanly.");

        Assert.Equal(0.83, metric.Value.GetValueOrDefault(), precision: 4);
        Assert.Equal("Both phases pass cleanly.", metric.Interpretation?.Reason);
    }

    [Fact]
    public async Task OutOfRangeJudgeScore_IsClampedToOne()
    {
        var metric = await EvaluateAsync("SCORE: 1.7\nREASON: exceeds the range.");

        Assert.Equal(1.0, metric.Value);
    }

    private static async Task<NumericMetric> EvaluateAsync(string judgeReply)
    {
        var evaluator = new SkillQualityEvaluator();
        var chatConfiguration = new ChatConfiguration(new FixedResponseChatClient(judgeReply));
        var messages = new[] { new ChatMessage(ChatRole.User, "Validate this SKILL.md.") };
        var response = new ChatResponse(new ChatMessage(ChatRole.Assistant, SkillText));

        EvaluationResult result = await evaluator.EvaluateAsync(messages, response, chatConfiguration);

        return result.Get<NumericMetric>(SkillQualityEvaluator.MetricName);
    }
}
