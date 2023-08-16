using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetCustomer();
        Task<Customer> GetCustomerById(int Id);
        Task<Customer> InsertCustomer(Customer customer);
        List<string> AddValidation(Customer manage);
        Task<Customer> UpdateCustomer(Customer customer);
    }

    public class CustomerRepository : ICustomerRepository
    {
        private readonly DbContext context;

        public CustomerRepository(DbContext _Context)
        {
            context = _Context;
        }

        public async Task<IEnumerable<Customer>> GetCustomer()
        {
            try
            {
                return await context.Customers.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Customer> GetCustomerById(int Id)
        {
            try
            {
                var find = await context.Customers.FindAsync(Id);
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

        public async Task<Customer> InsertCustomer(Customer customer)
        {
            try
            {
                context.Customers.Add(customer);
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return customer;
        }

        public List<string> AddValidation(Customer Manage)
        {
            List<string> errors = new List<string>();
            var existing = context.Customers.FirstOrDefault(
                t => t.Email.ToLower() == Manage.Email.ToLower()
            );
            if (existing != null)
            {
                errors.Add("Customer already exists");
            }
            return errors;
        }

        public async Task<Customer> UpdateCustomer(Customer manage)
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
