using Insurance.Models;

namespace Insurance.Services;

public interface IPolicyService
{
    Task<IEnumerable<Policy>> GetAllPoliciesAsync();
    Task<IEnumerable<Policy>> GetAllPoliciesByUserAsync(string userId);
    Task<Policy?> GetPolicyByIdAsync(Guid id);
    Task<Policy> CreatePolicyAsync(Policy policy);
    Task<Policy> UpdatePolicyAsync(Policy policy);
    Task DeletePolicyAsync(Policy policy);
}