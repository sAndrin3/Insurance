using Microsoft.AspNetCore.Identity;

namespace Insurance.Models;

public class User : IdentityUser
{
    public ICollection<Policy> Policies { get; set; } = new List<Policy>();
}