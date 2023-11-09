using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetOrders();
        Task<Order> GetOrderById(int Id);
        Task<Order> UpdateOrder(Order order);
        Task<Order> AddOrder(Order order);
        bool DeleteOrder(int Id);
        Task<int> GetOrderCount();
    }

    public class OrderRepository : IOrderRepository
    {
        private readonly Context context;

        public OrderRepository(Context _context)
        {
            context = _context;
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            try
            {
                return await context.Orders.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Order> GetOrderById(int Id)
        {
            try
            {
                var find = await context.Orders.FindAsync(Id);
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

        public async Task<Order> UpdateOrder(Order order)
        {
            try
            {
                context.Entry(order).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return order;
        }

        public async Task<Order> AddOrder(Order order)
        {
            try
            {
                context.Orders.Add(order);
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return order;
        }

        public bool DeleteOrder(int Id)
        {
            var result = false;
            try
            {
                var find = context.Orders.Find(Id);
                if (find != null)
                {
                    context.Remove(find).State = EntityState.Deleted;
                    context.SaveChanges();
                    result = true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                throw;
            }
            return result;
        }

        public async Task<int> GetOrderCount()
        {
            return context.Orders.Count();
        }
    }
}
