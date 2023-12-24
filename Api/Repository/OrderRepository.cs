using System.Collections;
using System.Linq;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<vOrder>> GetOrders();
        Task<vOrder> GetOrderById(int Id);
        Task<Order> UpdateOrder(Order order);
        Task<Order> AddOrder(Order order);
        bool DeleteOrder(int Id);
        Task<int> GetOrderCount();
        Task<int> GetOrderCountMonth();
        Task<int> GetOrderCountyear();
        Task<int> Revenue();
        Task<int> RevenueYear();
        Task<int> RevenueMonth();
        Task<IEnumerable<vOrder>> TodayOrderList();
        Task<IEnumerable<vOrder>> MonthOrderList();
        Task<IEnumerable<vOrder>> YearOrderList();
        Task RemoveOrderByProductId(int productId);

    }

    public class OrderRepository : IOrderRepository
    {
        private readonly Context context;

        public OrderRepository(Context _context)
        {
            context = _context;
        }

        public async Task RemoveOrderByProductId(int productId)
        {
            var orders = context.Orders.Where(order => order.ProductId== productId);
            context.Orders.RemoveRange(orders);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<vOrder>> GetOrders()
        {
            try
            {
                return await context.vOrders.OrderByDescending(t => t.OrderDate.Date).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<vOrder> GetOrderById(int Id)
        {
            try
            {
                var find = await context.vOrders.FindAsync(Id);
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
            var datetime = DateTime.Now.Date;
            return context.Orders.Where(t => t.OrderDate.Date == datetime).Count();
        }

        public async Task<int> GetOrderCountMonth()
        {
            var datetime = DateTime.Now.Month;
            return context.Orders.Where(t => t.OrderDate.Month == datetime).Count();
        }

        public async Task<int> GetOrderCountyear()
        {
            var datetime = DateTime.Now.Year;
            return context.Orders.Where(t => t.OrderDate.Year == datetime).Count();
        }

        public async Task<int> Revenue()
        {
            return context.Orders
                .Where(
                    t =>
                        t.Status == "Completed"
                        && (
                            t.StatusDateTime.HasValue
                            && t.StatusDateTime.Value.Date == DateTime.Now.Date
                        )
                )
                .Sum(t => t.Amount * t.Quantity);
        }

        public async Task<int> RevenueMonth()
        {
            return context.Orders
                .Where(
                    t =>
                        t.Status == "Completed"
                        && (
                            t.StatusDateTime.HasValue
                            && t.StatusDateTime.Value.Month == DateTime.Now.Month
                        )
                )
                .Sum(t => t.Amount * t.Quantity);
        }

        public async Task<int> RevenueYear()
        {
            return context.Orders
                .Where(
                    t =>
                        t.Status == "Completed"
                        && (
                            t.StatusDateTime.HasValue
                            && t.StatusDateTime.Value.Year == DateTime.Now.Year
                        )
                )
                .Sum(t => t.Amount * t.Quantity);
        }

        // public Task<IEnumerable<Product>> TopSelling()
        // {
        //     var topSelling = context.Orders
        //         .GroupBy(t => t.ProductId)
        //         .Select(g => new { Id = g.Key, TotalQuantitySold = g.Sum(p => p.Quantity) })
        //         .OrderByDescending(o => o.TotalQuantitySold)
        //         .Take(5)
        //         .Join(
        //             context.Products,
        //             p => p.Id,
        //             pr => pr.Id,
        //             (p, pr) => new { product = pr, QuantitySold = p.TotalQuantitySold, }
        //         );
        //     return topSelling.ToList();
        // }
        public async Task<IEnumerable<vOrder>> TodayOrderList()
        {
            try
            {
                return context.vOrders.Where(t => t.OrderDate.Date == DateTime.Now.Date).ToList();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<vOrder>> MonthOrderList()
        {
            try
            {
                var datetime = DateTime.Now.Month;
                return context.vOrders.Where(t => t.OrderDate.Month == datetime).ToList();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<vOrder>> YearOrderList()
        {
            try
            {
                var datetime = DateTime.Now.Year;
                return context.vOrders.Where(t => t.OrderDate.Year == datetime).ToList();
            }
            catch
            {
                throw;
            }
        }
    }
}
