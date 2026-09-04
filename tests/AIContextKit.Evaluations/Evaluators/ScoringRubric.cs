using Microsoft.Extensions.AI.Evaluation;

namespace AIContextKit.Evaluations.Evaluators;

// Point budget from skills/validate-skill/references/scoring.md. One definition so the structural
// evaluator's phase math, the quality judge prompt, and the test's 60/40 weighting can't drift apart.
public static class ScoringRubric
{
    // Deterministic, structural — SkillStructuralEvaluator.
    public const double Phase1PresenceStructureFrontmatter = 20.0;
    public const double Phase2FieldConstraintsNamingParity = 25.0;
    public const double Phase4ResourceReferencesSafety = 15.0;

    // Subjective, LLM-judged — SkillQualityEvaluator.
    public const double Phase3InstructionQuality = 25.0;
    public const double Phase5NeutralityPortability = 15.0;

    public const double StructuralPoints =
        Phase1PresenceStructureFrontmatter + Phase2FieldConstraintsNamingParity + Phase4ResourceReferencesSafety; // 60

    public const double QualityPoints = Phase3InstructionQuality + Phase5NeutralityPortability; // 40

    public const double TotalPoints = StructuralPoints + QualityPoints; // 100

    // Rating band for a normalized 0.0-1.0 score.
    public static EvaluationRating RatingFromScore(double score) =>
        score >= 0.9 ? EvaluationRating.Good
      : score >= 0.6 ? EvaluationRating.Average
      : EvaluationRating.Poor;
}
