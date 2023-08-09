using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetCustomer();
        Task<Customer> GetCustomerById(int Id);
        Task<Customer> InsertCustomer(Customer customer);
        List<string> AddValidation(Customer customer);
        Task<Customer> UpdateCustomer(Customer customer);
        bool DeleteCustomer(int Id);
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

        public List<string> AddValidation(Customer customer)
        {
            List<string> errors = new List<string>();
            var existing = context.Customers.FirstOrDefault(
                t => t.Email.ToLower() == customer.Email.ToLower()
            );
            if (existing != null)
            {
                errors.Add("Customer already exists");
            }
            return errors;
        }

        public async Task<Customer> UpdateCustomer(Customer customer)
        {
            try
            {
                context.Entry(customer).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return customer;
        }

        public bool DeleteCustomer(int Id)
        {
            var result = false;
            try
            {
                var find = context.Customers.Find(Id);
                if (find != null)
                {
                    context.Remove(find).State = EntityState.Deleted;
                    context.SaveChangesAsync();
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
