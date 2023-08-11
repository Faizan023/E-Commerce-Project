using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface IManageCustomerRepository
    {
        Task<IEnumerable<ManageCustomer>> GetCustomer();
        Task<ManageCustomer> GetCustomerById(int Id);
        List<string> AddValidation(ManageCustomer manage);
        Task<ManageCustomer> UpdateCustomer(ManageCustomer customer);
    }

    public class ManageCustomerRepository : IManageCustomerRepository
    {
        private readonly DbContext context;

        public ManageCustomerRepository(DbContext _Context)
        {
            context = _Context;
        }

        public async Task<IEnumerable<ManageCustomer>> GetCustomer()
        {
            try
            {
                return await context.Manages.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<ManageCustomer> GetCustomerById(int Id)
        {
            try
            {
                var find = await context.Manages.FindAsync(Id);
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

        public List<string> AddValidation(ManageCustomer Manage)
        {
            List<string> errors = new List<string>();
            var existing = context.Manages.FirstOrDefault(
                t => t.Email.ToLower() == Manage.Email.ToLower()
            );
            if (existing != null)
            {
                errors.Add("Customer already exists");
            }
            return errors;
        }

        public async Task<ManageCustomer> UpdateCustomer(ManageCustomer manage)
        {
            try
            {
                context.Entry(manage).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return manage;
        }
    }
}
