using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface ICartRepository
    {
        Task<IEnumerable<Cart>> GetCarts();
        Task<Cart> GetCartById(int Id);
        Task<Cart> AddToCart(Cart cart);
        bool RemoveCart(int id);
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
                var find = context.Carts.Find(Id);
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
    }
}
