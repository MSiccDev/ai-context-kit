using Microsoft.Extensions.Configuration;
using AIContextKit.Evaluations;

namespace AIContextKit.Evaluations.Tests;

public class OllamaJudgeSettingsTests
{
    private static IConfiguration Config(params (string Key, string? Value)[] pairs) =>
        new ConfigurationBuilder()
            .AddInMemoryCollection(pairs.ToDictionary(p => p.Key, p => p.Value))
            .Build();

    private static (string, string?)[] AllKeysSet() =>
    [
        (OllamaJudgeSettings.EndpointKey, "http://ollama.example:1234"),
        (OllamaJudgeSettings.ModelKey, "llama3.1:8b"),
        (OllamaJudgeSettings.TimeoutMinutesKey, "3.5"),
    ];

    [Fact]
    public void FromConfiguration_ReadsAllThreeKeys()
    {
        var settings = OllamaJudgeSettings.FromConfiguration(Config(AllKeysSet()));

        Assert.Equal(new Uri("http://ollama.example:1234"), settings.Endpoint);
        Assert.Equal("llama3.1:8b", settings.Model);
        Assert.Equal(TimeSpan.FromMinutes(3.5), settings.Timeout);
    }

    [Theory]
    [InlineData(OllamaJudgeSettings.EndpointKey)]
    [InlineData(OllamaJudgeSettings.ModelKey)]
    [InlineData(OllamaJudgeSettings.TimeoutMinutesKey)]
    public void FromConfiguration_ThrowsWithKeyName_WhenKeyMissing(string missingKey)
    {
        var pairs = AllKeysSet().Where(p => p.Item1 != missingKey).ToArray();

        var ex = Assert.Throws<InvalidOperationException>(
            () => OllamaJudgeSettings.FromConfiguration(Config(pairs)));
        Assert.Contains(missingKey, ex.Message);
    }

    [Fact]
    public void FromConfiguration_ParsesTimeoutWithInvariantCulture()
    {
        var pairs = AllKeysSet();
        pairs[2] = (OllamaJudgeSettings.TimeoutMinutesKey, "1.5"); // '.' decimal separator, not ','

        var settings = OllamaJudgeSettings.FromConfiguration(Config(pairs));

        Assert.Equal(TimeSpan.FromMinutes(1.5), settings.Timeout);
    }

    [Fact]
    public void FromConfiguration_ThrowsFormatException_WhenTimeoutNotANumber()
    {
        var pairs = AllKeysSet();
        pairs[2] = (OllamaJudgeSettings.TimeoutMinutesKey, "soon");

        Assert.Throws<FormatException>(() => OllamaJudgeSettings.FromConfiguration(Config(pairs)));
    }
}
