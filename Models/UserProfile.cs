namespace DiaryApp;

public partial class UserProfile
{
    public UserProfile() { }

    public string Name { get; set; } = null!;

    public string EmailAddress { get; set; } = null!;

    public string? ProfileImage { get; set; }

    //public virtual ICollection<Diary> Diaries { get; set; } = new List<Diary>();
}
