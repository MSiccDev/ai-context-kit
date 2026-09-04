using System.Globalization;
using System.Text.RegularExpressions;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;

namespace AIContextKit.Evaluations.Evaluators;

/// <summary>
/// LLM-as-judge evaluator reproducing validate-skill's Phase 3 and Phase 5
/// checks — the genuinely subjective <see cref="ScoringRubric.QualityPoints"/>
/// of <see cref="ScoringRubric.TotalPoints"/> in scoring.md. Structurally the
/// same pattern as ArchitecturalRelevanceEvaluator: the rubric lives in the
/// prompt, the response is parsed from a fixed format.
/// </summary>
public sealed class SkillQualityEvaluator : IEvaluator
{
    public const string MetricName = "SkillQualityScore"; // 0.0-1.0, represents ScoringRubric.QualityPoints of TotalPoints

    public IReadOnlyCollection<string> EvaluationMetricNames => [MetricName];

    public async ValueTask<EvaluationResult> EvaluateAsync(
        IEnumerable<ChatMessage> messages,
        ChatResponse modelResponse,
        ChatConfiguration? chatConfiguration = null,
        IEnumerable<EvaluationContext>? additionalContext = null,
        CancellationToken cancellationToken = default)
    {
        if (chatConfiguration?.ChatClient is null)
        {
            throw new InvalidOperationException(
                $"{nameof(SkillQualityEvaluator)} requires a {nameof(ChatConfiguration)} " +
                "with a valid ChatClient to act as the judge.");
        }

        string skillText = modelResponse.Text ?? string.Empty;

        if (string.IsNullOrWhiteSpace(skillText))
        {
            var emptyMetric = new NumericMetric(MetricName, 0.0);
            emptyMetric.AddDiagnostics(EvaluationDiagnostic.Error("SKILL.md content was empty."));
            return new EvaluationResult(emptyMetric);
        }

        // Rubric mirrors phase-checks.md Phase 3 and Phase 5 directly; point weights come from ScoringRubric.
        string phase3Weight = (ScoringRubric.Phase3InstructionQuality / ScoringRubric.QualityPoints)
            .ToString("0.###", CultureInfo.InvariantCulture);
        string phase5Weight = (ScoringRubric.Phase5NeutralityPortability / ScoringRubric.QualityPoints)
            .ToString("0.###", CultureInfo.InvariantCulture);
        string phase3Points = ScoringRubric.Phase3InstructionQuality.ToString("0.#", CultureInfo.InvariantCulture);
        string phase5Points = ScoringRubric.Phase5NeutralityPortability.ToString("0.#", CultureInfo.InvariantCulture);
        string qualityPoints = ScoringRubric.QualityPoints.ToString("0.#", CultureInfo.InvariantCulture);

        string judgePrompt = $"""
            You are validating a SKILL.md file against the following criteria.
            Score 0.0-1.0 as a weighted combination:

            PHASE 3 - Instruction Quality And Completeness (weight {phase3Weight}, i.e. {phase3Points} of {qualityPoints} points):
            - operational guidance is clear and actionable, not vague
            - required body sections exist (Purpose, When To Use, Workflow, etc.)
            - scope boundaries are explicit (what NOT to use this skill for)
            - progressive disclosure is respected (doesn't front-load unnecessary detail)

            PHASE 5 - Neutrality And Portability (weight {phase5Weight}, i.e. {phase5Points} of {qualityPoints} points):
            - wording is provider-neutral (not locked to one specific AI tool)
            - the skill is portable across runtimes
            - no mandatory runtime lock-in assumptions

            SKILL.md TEXT:
            ---
            {skillText}
            ---

            Respond in EXACTLY this format, nothing else:
            SCORE: <a number between 0.0 and 1.0>
            REASON: <one sentence citing the most significant gap, or confirming both phases pass cleanly>
            """;

        var judgeMessages = new List<ChatMessage> { new(ChatRole.User, judgePrompt) };

        ChatResponse judgeResponse = await chatConfiguration.ChatClient
            .GetResponseAsync(judgeMessages, cancellationToken: cancellationToken)
            .ConfigureAwait(false);

        string judgeText = judgeResponse.Text ?? string.Empty;

        // A local model that drops the SCORE:/REASON: format is a misbehaving judge, not a test
        // crash: record a Poor result carrying the raw response so the run still completes and the
        // failure is triageable, rather than throwing out of EvaluateAsync.
        if (ParseJudgeResponse(judgeText) is not (double score, string reason))
        {
            var unparsedMetric = new NumericMetric(MetricName, 0.0);
            unparsedMetric.Interpretation = new EvaluationMetricInterpretation(
                rating: ScoringRubric.RatingFromScore(0.0),
                reason: "Judge response did not contain a parseable SCORE line.");
            unparsedMetric.AddDiagnostics(EvaluationDiagnostic.Error(
                $"Could not parse a SCORE from the judge response. Raw response:\n{judgeText}"));
            return new EvaluationResult(unparsedMetric);
        }

        var metric = new NumericMetric(MetricName, score);
        metric.Interpretation = new EvaluationMetricInterpretation(
            rating: ScoringRubric.RatingFromScore(score),
            reason: reason);
        metric.AddDiagnostics(EvaluationDiagnostic.Informational(judgeText));

        return new EvaluationResult(metric);
    }

    private static (double Score, string Reason)? ParseJudgeResponse(string judgeText)
    {
        var scoreMatch = Regex.Match(judgeText, @"SCORE:\s*([0-9]*\.?[0-9]+)", RegexOptions.IgnoreCase);
        var reasonMatch = Regex.Match(judgeText, @"REASON:\s*(.+)", RegexOptions.IgnoreCase | RegexOptions.Singleline);

        if (!scoreMatch.Success ||
            !double.TryParse(scoreMatch.Groups[1].Value, NumberStyles.Number, CultureInfo.InvariantCulture, out double score))
        {
            return null;
        }

        score = Math.Clamp(score, 0.0, 1.0);
        string reason = reasonMatch.Success ? reasonMatch.Groups[1].Value.Trim() : "(no reason provided by judge)";
        return (score, reason);
    }
}