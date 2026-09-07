using Microsoft.Extensions.Configuration;
using AIContextKit.Evaluations;

namespace AIContextKit.Evaluations.Tests;

public class LmStudioJudgeSettingsTests
{
    private static IConfiguration Config(params (string Key, string? Value)[] pairs) =>
        new ConfigurationBuilder()
            .AddInMemoryCollection(pairs.ToDictionary(p => p.Key, p => p.Value))
            .Build();

    private static (string, string?)[] AllKeysSet() =>
    [
        (LmStudioJudgeSettings.EndpointKey, "http://lmstudio.example:1234/v1"),
        (LmStudioJudgeSettings.ModelKey, "microsoft/phi-4-reasoning-plus"),
        (LmStudioJudgeSettings.TimeoutMinutesKey, "3.5"),
    ];

    [Fact]
    public void FromConfiguration_ReadsAllThreeKeys()
    {
        var settings = LmStudioJudgeSettings.FromConfiguration(Config(AllKeysSet()));

        Assert.Equal(new Uri("http://lmstudio.example:1234/v1"), settings.Endpoint);
        Assert.Equal("microsoft/phi-4-reasoning-plus", settings.Model);
        Assert.Equal(TimeSpan.FromMinutes(3.5), settings.Timeout);
    }

    [Theory]
    [InlineData(LmStudioJudgeSettings.EndpointKey)]
    [InlineData(LmStudioJudgeSettings.ModelKey)]
    [InlineData(LmStudioJudgeSettings.TimeoutMinutesKey)]
    public void FromConfiguration_ThrowsWithKeyName_WhenKeyMissing(string missingKey)
    {
        var pairs = AllKeysSet().Where(p => p.Item1 != missingKey).ToArray();

        var ex = Assert.Throws<InvalidOperationException>(
            () => LmStudioJudgeSettings.FromConfiguration(Config(pairs)));
        Assert.Contains(missingKey, ex.Message);
    }

    [Fact]
    public void FromConfiguration_ParsesFractionalTimeout()
    {
        var pairs = AllKeysSet();
        pairs[2] = (LmStudioJudgeSettings.TimeoutMinutesKey, "1.5");

        var settings = LmStudioJudgeSettings.FromConfiguration(Config(pairs));

        Assert.Equal(TimeSpan.FromMinutes(1.5), settings.Timeout);
    }

    [Fact]
    public void FromConfiguration_ThrowsWithKeyName_WhenTimeoutNotANumber()
    {
        var pairs = AllKeysSet();
        pairs[2] = (LmStudioJudgeSettings.TimeoutMinutesKey, "soon");

        var ex = Assert.Throws<InvalidOperationException>(
            () => LmStudioJudgeSettings.FromConfiguration(Config(pairs)));
        Assert.Contains(LmStudioJudgeSettings.TimeoutMinutesKey, ex.Message);
    }
}
