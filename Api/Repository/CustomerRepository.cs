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
        bool DeleteCustomer(int Id);
        Task<int> CustomerCount();
        Task<int> CustomerCountMonth();
        Task<int> CustomerCountYear();
        Task<IEnumerable<Customer>> RecentCustomer();
    }

    public class CustomerRepository : ICustomerRepository
    {
        private readonly Context context;

        public CustomerRepository(Context _Context)
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

        public bool DeleteCustomer(int Id)
        {
            var result = false;
            try
            {
                var find = context.Customers.Find(Id);
                if (find != null)
                {
                    context.Remove(find).State = EntityState.Deleted;
                    context.SaveChanges();
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

        public async Task<int> CustomerCount()
        {
            var date = DateTime.Now.Date;
            return context.Customers.Where(t => t.CreatedDateTime.Date == date).Count();
        }

        public async Task<int> CustomerCountMonth()
        {
            var date = DateTime.Now.Month;
            return context.Customers.Where(t => t.CreatedDateTime.Month == date).Count();
        }

        public async Task<int> CustomerCountYear()
        {
            var date = DateTime.Now.Year;
            return context.Customers.Where(t => t.CreatedDateTime.Year == date).Count();
        }
    // Recently joined 5 customer 
        public async Task<IEnumerable<Customer>> RecentCustomer()
        {
            try
            {
                return await context.Customers.OrderByDescending(t => t.Id).Take(5).ToListAsync();
            }
            catch
            {
                throw;
            }
        }
    }
}
