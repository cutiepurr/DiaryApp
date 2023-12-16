using System;
using System.Collections.Generic;

namespace DiaryApp;

public partial class Diary
{
    public uint Id { get; set; }

    public uint UserId { get; set; }

    public string Title { get; set; } = null!;

    public string? Content { get; set; }

    public bool IsPublished { get; set; }

    public DateTime CreatedTimestamp { get; set; }

    public DateTime? PublishedTimestamp { get; set; }

    public virtual User User { get; set; } = null!;
}
