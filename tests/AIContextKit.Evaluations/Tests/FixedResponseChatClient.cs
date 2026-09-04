using Microsoft.Extensions.AI;

namespace AIContextKit.Evaluations.Tests;

// Minimal IChatClient test double that always returns one canned assistant message. Lets the
// LLM-judge evaluators be exercised offline with a known judge reply (well-formed or malformed).
internal sealed class FixedResponseChatClient(string responseText) : IChatClient
{
    public Task<ChatResponse> GetResponseAsync(
        IEnumerable<ChatMessage> messages,
        ChatOptions? options = null,
        CancellationToken cancellationToken = default) =>
        Task.FromResult(new ChatResponse(new ChatMessage(ChatRole.Assistant, responseText)));

    public IAsyncEnumerable<ChatResponseUpdate> GetStreamingResponseAsync(
        IEnumerable<ChatMessage> messages,
        ChatOptions? options = null,
        CancellationToken cancellationToken = default) =>
        throw new NotSupportedException($"{nameof(FixedResponseChatClient)} does not support streaming.");

    public object? GetService(Type serviceType, object? serviceKey = null) => null;

    public void Dispose()
    {
    }
}
