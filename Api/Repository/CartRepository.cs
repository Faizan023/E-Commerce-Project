using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Models;
using MOdels;

namespace Repository
{
    public interface ICartRepository
    {
        Task<IEnumerable<Cart>> GetCarts();
        Task<Cart> GetCartById(int Id);
        Task<Cart> AddToCart(Cart cart);
        bool RemoveCart(int id);
        Task<IEnumerable<vCart>> GetCustomerCart(int Id);
        Task<int> CartCount(int Id);
        Task<int> OrderCount(int Id);
        Task RemoveCartByProductId(int productId);
    }

    public class CartRepository : ICartRepository
    {
        private readonly Context context;

        public CartRepository(Context _context)
        {
            context = _context;
        }

        public async Task<IEnumerable<Cart>> GetCarts()
        {
            try
            {
                return await context.Carts.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task RemoveCartByProductId(int productId)
        {
            try
            {
                var carts = context.Carts.Where(cart=>cart.ProductId == productId).ToList();
                
                 context.Carts.RemoveRange(carts);
                 await context.SaveChangesAsync();

            }
            catch (System.Exception)
            {
                
                throw;
            }
        }
        public async Task<Cart> GetCartById(int Id)
        {
            try
            {
                var find = await context.Carts.FindAsync(Id);
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

        public async Task<Cart> AddToCart(Cart cart)
        {
            try
            {
                context.Carts.Add(cart);
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return cart;
        }

        public bool RemoveCart(int Id)
        {
            var result = false;
            try
            {
                var cart = context.Carts.Find(Id);
                if (cart != null)
                {   
                    context.Carts.Attach(cart);
                    context.Carts.Remove(cart);
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

        public async Task<IEnumerable<vCart>> GetCustomerCart(int Id)
        {
            try
            {
                var items = context.vCarts.Where(t => t.CustomerId == Id).ToList();
                if (items.Count() > 0)
                {
                    return items;
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

        public async Task<int> CartCount(int Id)
        {
            try
            {
                var count = context.Carts.Where(t => t.CustomerId == Id).Count();
                return count;
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> OrderCount(int Id)
        {
            try
            {
                var count = context.Orders.Where(t => t.CustomerId == Id).Count();
                return count;
            }
            catch
            {
                throw;
            }
        }
    }
}
