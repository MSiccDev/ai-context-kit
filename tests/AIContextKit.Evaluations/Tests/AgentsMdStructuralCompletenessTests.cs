using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;
using AIContextKit.Evaluations.Evaluators;

namespace AIContextKit.Evaluations.Tests;

public class AgentsMdStructuralCompletenessTests
{
    // The positive path runs through DiskBasedReportingConfiguration so its result is recorded to
    // eval-results/ for the aieval HTML report (see README "Evaluation Reports"). The negative path
    // is a plain evaluator call via the shared helper below — no value in recording an expected
    // failure. Both exercise the same IEvaluator.EvaluateAsync surface.
    [Fact]
    public async Task AgentsMd_ShouldHaveAllRequiredFields()
    {
        await using var scenarioRun = await EvaluationHarness.CreateScenarioRunAsync(
            scenarioName: nameof(AgentsMd_ShouldHaveAllRequiredFields),
            evaluators: [new AgentsMdStructuralCompletenessEvaluator()]);

        var agentsMd = await File.ReadAllTextAsync(AgentsMdStructuralCompletenessEvaluator.FindAgentsMdPath());
        var messages = new List<ChatMessage> { new(ChatRole.User, "Validate the AGENTS.md for this repository") };
        var modelResponse = new ChatResponse(new ChatMessage(ChatRole.Assistant, agentsMd));

        var result = await scenarioRun.EvaluateAsync(messages, modelResponse);

        var metric = result.Get<BooleanMetric>(AgentsMdStructuralCompletenessEvaluator.MetricName);
        Assert.True(metric.Value, metric.Reason);
    }

    [Fact]
    public async Task AgentsMd_ShouldFailWhenRequiredFieldIsMissing()
    {
        // A realistic AGENTS.md — same repository content as the root file — with the
        // "## Purpose" section actually removed, rather than a synthetic list of headings.
        var incompleteAgentsMd = await File.ReadAllTextAsync("TestData/agents-md/incomplete-example/AGENTS.md");

        var metric = await EvaluateCompletenessAsync(incompleteAgentsMd);

        Assert.False(metric.Value);
        Assert.Contains(AgentsMdStructuralCompletenessEvaluator.RequiredFields[0], metric.Reason);
    }

    private static async Task<BooleanMetric> EvaluateCompletenessAsync(string agentsMdContent)
    {
        IEvaluator evaluator = new AgentsMdStructuralCompletenessEvaluator();
        var messages = new[] { new ChatMessage(ChatRole.User, "Validate the AGENTS.md for this repository") };
        var response = new ChatResponse(new ChatMessage(ChatRole.Assistant, agentsMdContent));

        EvaluationResult result = await evaluator.EvaluateAsync(messages, response);

        return result.Get<BooleanMetric>(AgentsMdStructuralCompletenessEvaluator.MetricName);
    }
}
