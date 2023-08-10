using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetOrders();
        Task<Order> GetOrderById(int Id);
        Task<Order> UpdateOrder(Order order);
    }

    public class OrderRepository : IOrderRepository
    {
        private readonly DbContext context;

        public OrderRepository(DbContext _context)
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
    }
}
