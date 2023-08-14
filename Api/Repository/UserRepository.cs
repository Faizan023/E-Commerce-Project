using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUserById(int Id);
        Task<User> InsertUser(User user);
        Task<User> UpdateUser(User user);
        bool DeleteUser(int Id);
    }

    public class UserRepository : IUserRepository
    {
        private readonly DbContext _context;

        public UserRepository(DbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            try
            {
                return await _context.Users.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<User> GetUserById(int Id)
        {
            try
            {
                var find = await _context.Users.FindAsync(Id);
                if (find != null)
                {
                    return find;
                }
                else
                {
                    throw new ArgumentNullException();
                }
            }
            catch
            {
                throw;
            }
        }

        public async Task<User> InsertUser(User user)
        {
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return user;
        }

        public async Task<User> UpdateUser(User user)
        {
            try
            {
                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return user;
        }

        public bool DeleteUser(int Id)
        {
            var result = false;
            try
            {
                var find = _context.Users.Find(Id);
                if (find != null)
                {
                    _context.Remove(find).State = EntityState.Deleted;
                    _context.SaveChanges();
                    result = true;
                }
                else
                {
                    result = false;
                }
            }
            catch
            {
                throw;
            }
            return result;
        }
    }
}
