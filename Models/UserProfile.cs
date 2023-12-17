using System.Text.Json.Serialization;

namespace DiaryApp;

public partial class UserProfile
{
    // public UserProfile() { }

    [property: JsonPropertyName("name")]
    public string Name { get; set; } = null!;

    [property: JsonPropertyName("given_name")]
    public string GivenName { get; set; } = null!;

    [property: JsonPropertyName("family_name")]
    public string FamilyName { get; set; } = null!;

    [property: JsonPropertyName("email")]
    public string Email { get; set; } = null!;

    // [property: JsonPropertyName("picture")]
    // public string? ProfileImage { get; set; }

    //public virtual ICollection<Diary> Diaries { get; set; } = new List<Diary>();
}
