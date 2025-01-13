namespace Insurance.Models.Dto;

public class PolicyRequestDto
{
    public Guid Id { get; set; }
    
    public string PolicyNumber { get; set; } = string.Empty;
    
    public string PolicyholderName { get; set; } = String.Empty;
    
    public string PolicyholderEmail { get; set; } = String.Empty;
    
    public string? PolicyholderPhone { get; set; }
    
    public DateTime StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
    
    public decimal PremiumAmount { get; set; }
    
    public decimal CoverageAmount { get; set; }
    
    public string PolicyType { get; set; } = String.Empty;
    
    public string UserId { get; set; }
}