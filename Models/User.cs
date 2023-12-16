namespace DiaryApp;

public partial class User
{
    public uint Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string HashedPassword { get; set; } = null!;

    public DateTime CreatedTimestamp { get; set; }

    public virtual ICollection<Diary> Diaries { get; set; } = new List<Diary>();
}
