using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface IWishlistRepository
    {
        Task<IEnumerable<Wishlist>> GetWishlist();
        Task<Wishlist> GetWishlistById(int Id);
        Task<Wishlist> InsertWishlist(Wishlist wishlist);
        Task<Wishlist> UpdateWishlist(Wishlist wishlist);
        bool DeleteWishlist(int Id);
        Task<IEnumerable<vWishlist>> GetCustomerWishlist(int Id);
        Task<int> GetWishlistCount(int Id);
    }

    public class WishlistRepository : IWishlistRepository
    {
        private readonly Context context;

        public WishlistRepository(Context _context)
        {
            context = _context;
        }

        public async Task<IEnumerable<Wishlist>> GetWishlist()
        {
            try
            {
                return await context.Wishlists.OrderByDescending(t => t.Id).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Wishlist> GetWishlistById(int Id)
        {
            try
            {
                var find = await context.Wishlists.FindAsync(Id);
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

        public async Task<Wishlist> InsertWishlist(Wishlist wishlist)
        {
            try
            {
                context.Wishlists.Add(wishlist);
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return wishlist;
        }

        public async Task<Wishlist> UpdateWishlist(Wishlist wishlist)
        {
            try
            {
                context.Entry(wishlist).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return wishlist;
        }

        public bool DeleteWishlist(int Id)
        {
            var result = false;
            try
            {
                var find = context.Wishlists.Find(Id);
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

        public async Task<IEnumerable<vWishlist>> GetCustomerWishlist(int Id)
        {
            try
            {
                var find = await context.vWishlists.Where(t => t.CustomerId == Id).ToListAsync();
                if (find.Count() > 0)
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

        public async Task<int> GetWishlistCount(int Id)
        {
            try
            {
                var count = context.Wishlists.Where(t => t.CustomerId == Id).Count();
                return count;
            }
            catch
            {
                throw;
            }
        }
    }
}
