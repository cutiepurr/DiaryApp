namespace DiaryApp;

public partial class Diary
{
    public uint Id { get; set; }

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime CreatedTimestamp { get; set; }
}
