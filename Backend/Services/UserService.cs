using AuthScape.Models.Users;
using CoreBackpack;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.Context;
using System.Security.Claims;

namespace Services
{
    public interface IUserService
    {
        List<QueryRole> GetAllRoles();
        Task RestoreAccount(long userId);
        Task ArchiveAccount(long userId);
        Task<AppUser?> GetUser(long userId);
        Task<PagedList<UserSummary>> GetAllUsers(int offset = 1, int length = 10, int userState = 0);
        Task AddRoleToUser(long userId, string role);
        Task AddRole(string Name);
        Task AddClaim(long userId, string claimType, string claimValue);
        Task<IList<Claim>> GetClaims(long userId);
        Task AddUserRoleClaim(long roleId, string claimType, string claimValue);
    }

    public class UserService : IUserService
    {
        
        readonly DatabaseContext databaseContext;
        readonly UserManager<AppUser> userManager;

        public UserService(DatabaseContext databaseContext, UserManager<AppUser> userManager)
        {
            this.databaseContext = databaseContext;
            this.userManager = userManager;
        }

        public async Task<PagedList<UserSummary>> GetAllUsers(int offset = 1, int length = 10, int userState = 0)
        {
            IQueryable<AppUser> users = databaseContext.Users;
            if (userState == 0) // Active
            {
                users = users.Where(u => u.IsActive);
            }
            else if (userState == 1) // Archive
            {
                users = users.Where(u => !u.IsActive);
            }

            return await users
                .Include(i => i.Company)
                .Select(i => new UserSummary()
                {
                    Id = i.Id,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    Email = i.UserName,
                    Phone = i.PhoneNumber,
                    Created = i.Created.DateTime.ToShortDateString()
                })
                .ToPagedResultAsync(offset - 1, length);
        }

        public List<QueryRole> GetAllRoles()
        {
            var roles = new List<QueryRole>();

            Array enumValueArray = Enum.GetValues(typeof(Roles));
            foreach (int enumValue in enumValueArray)
            {
                roles.Add(new QueryRole()
                {
                    Id = enumValue,
                    Name = (Enum.GetName(typeof(Roles), enumValue))
                });
            }

            return roles;
        }

        public async Task RestoreAccount(long userId)
        {
            var usr = await databaseContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            if (usr != null)
            {
                usr.IsActive = true;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task ArchiveAccount(long userId)
        {
            var usr = await databaseContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            if (usr != null)
            {
                usr.IsActive = false;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task<AppUser?> GetUser(long userId)
        {
            return await databaseContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
        }

        public async Task<AppUser?> EditUser(long userId)
        {
            return await databaseContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
        }

        public async Task AddRole(string Name)
        {
            databaseContext.Roles.Add(new Role()
            {
                Name = Name,
                NormalizedName = Name.ToLower(),
                ConcurrencyStamp = Guid.NewGuid().ToString()
            });
            await databaseContext.SaveChangesAsync();
        }

        public async Task AddRoleToUser(long userId, string role)
        {
            var user = await databaseContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            if (user != null)
            {
                await userManager.AddToRoleAsync(user, role);
            }
        }

        public async Task AddClaim(long userId, string claimType, string claimValue)
        {
            await databaseContext.UserClaims.AddAsync(new IdentityUserClaim<long>()
            {
                ClaimValue = claimValue,
                ClaimType = claimType,
                UserId = userId
            });
            await databaseContext.SaveChangesAsync();
        }

        public async Task<IList<Claim>> GetClaims(long userId)
        {
            var user = await databaseContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            if (user != null)
            {
                return await userManager.GetClaimsAsync(user);
            }

            return null;
        }

        public async Task AddUserRoleClaim(long roleId, string claimType, string claimValue)
        {
            await databaseContext.RoleClaims.AddAsync(new IdentityRoleClaim<long>()
            {
                RoleId = roleId,
                ClaimType = claimType,
                ClaimValue = claimValue
            });
        }
    }
}