using Insurance.Data;
using Insurance.Migrations;
using Insurance.Models;
using Insurance.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace Insurance.Service;

public class PolicyService : IPolicyInterface
{
    private readonly AppDbContext _context;
    
    public PolicyService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Policy>> GetAllpoliciesAsync()
    {
        return await _context.Policies.ToListAsync();
    }

    public async Task<Policy> GetPolicyByIdAsync(Guid id)
    {
        return await _context.Policies.FirstOrDefaultAsync(policy => policy.Id == id);
    }

    public async Task<string> CreatePolicyAsync(Policy policy)
    {
        _context.Policies.Add(policy);
        await _context.SaveChangesAsync();
        return "Policy created successfully.";
    }

    public async Task<string> UpdatePolicyAsync(Policy policy)
    {
        _context.Entry(policy).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return "Policy updated successfully.";
    }

    public async Task<string> DeletePolicyAsync(Policy policy)
    {
        _context.Policies.Remove(policy);
        await _context.SaveChangesAsync();
        return "Policy deleted successfully.";
    }
}