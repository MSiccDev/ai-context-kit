using Microsoft.Extensions.AI;
using Microsoft.Extensions.AI.Evaluation;
using AIContextKit.Evaluations.Evaluators;

namespace AIContextKit.Evaluations;

// Builds the (messages, response, context) trio that both the isolated and the reporting-backed
// skill evaluation tests feed to their evaluators: the SKILL.md content wrapped as an assistant
// response, a fixed user prompt, and the folder-name context Phase 2's parity check needs.
public static class EvaluationInputs
{
    public static async Task<(ChatMessage[] Messages, ChatResponse Response, EvaluationContext[] Context)>
        ForSkillAsync(string skillPath, string folderName)
    {
        string skillText = await File.ReadAllTextAsync(skillPath);

        return (
            Messages: [new ChatMessage(ChatRole.User, "Validate this SKILL.md.")],
            Response: new ChatResponse(new ChatMessage(ChatRole.Assistant, skillText)),
            Context: [new SkillFolderContext(folderName)]);
    }
}
