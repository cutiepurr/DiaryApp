namespace DiaryApp;

public partial class Diary
{
    public uint Id { get; set; }

    public string UserEmail { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string? Content { get; set; }

    public bool IsPublished { get; set; }

    public DateTime CreatedTimestamp { get; set; }

    public DateTime? PublishedTimestamp { get; set; }
}
