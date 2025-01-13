using System.ComponentModel.DataAnnotations;

namespace Insurance.Models.Dto;

public class PolicyRequestDto
{
    [Required]
    public string PolicyNumber { get; set; } = string.Empty;
    
    [Required]
    public string PolicyholderName { get; set; } = String.Empty;
    
    [Required]
    [EmailAddress]
    public string PolicyholderEmail { get; set; } = String.Empty;
    
    [Phone]
    public string? PolicyholderPhone { get; set; }
    
    [Required]
    public DateTime? StartDate { get; set; }
    
    [Required]
    public DateTime? EndDate { get; set; }
    
    [Required]
    public decimal PremiumAmount { get; set; }
    
    [Required]
    public decimal CoverageAmount { get; set; }
    
    [Required]
    public string PolicyType { get; set; } = String.Empty;
}