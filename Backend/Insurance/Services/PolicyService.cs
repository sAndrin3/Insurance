using Insurance.Data;
using Insurance.Models;
using Microsoft.EntityFrameworkCore;

namespace Insurance.Services;

public class PolicyService : IPolicyService
{
    private readonly AppDbContext _dbContext;
    
    public PolicyService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Policy>> GetAllPoliciesAsync()
    {
        return await _dbContext.Policies.ToListAsync();
    }

    public async Task<IEnumerable<Policy>> GetAllPoliciesByUserAsync(string userId)
    {
        return await _dbContext.Policies.Where(p => p.UserId.Equals(userId)).OrderByDescending(p => p.CreatedAt).ToListAsync();
    }

    public async Task<Policy?> GetPolicyByIdAsync(Guid id)
    {
        return await _dbContext.Policies.FirstOrDefaultAsync(policy => policy.Id == id);
    }

    public async Task<Policy> CreatePolicyAsync(Policy policy)
    {
        _dbContext.Policies.Add(policy);
        await _dbContext.SaveChangesAsync();
        return policy;
    }

    public async Task<Policy> UpdatePolicyAsync(Policy policy)
    {
        _dbContext.Entry(policy).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return policy;
    }

    public async Task DeletePolicyAsync(Policy policy)
    {
        _dbContext.Policies.Remove(policy);
        await _dbContext.SaveChangesAsync();
    }
}