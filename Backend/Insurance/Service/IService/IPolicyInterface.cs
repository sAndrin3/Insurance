using Insurance.Models;

namespace Insurance.Service.IService;

public interface IPolicyInterface
{
    Task<IEnumerable<Policy>> GetAllpoliciesAsync();
    Task<Policy> GetPolicyByIdAsync(Guid id);
    Task<string> CreatePolicyAsync(Policy policy);
    Task<string> UpdatePolicyAsync(Policy policy);
    Task<string> DeletePolicyAsync(Policy policy);
}