using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface IhomepageRepository
    {
        Task<IEnumerable<vProduct>> GetFashion();
        Task<IEnumerable<vProduct>> GetMobiles();
        Task<IEnumerable<vProduct>> GetLaptop();
        Task<IEnumerable<vProduct>> GetClothes();
    }

    public class HomepageRepository : IhomepageRepository
    {
        private readonly Context context;

        public HomepageRepository(Context _context)
        {
            context = _context;
        }

        public async Task<IEnumerable<vProduct>> GetFashion()
        {
            try
            {
                return context.vProducts.Where(t => t.CategoryName == "Shoes").ToList().Take(10);
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<vProduct>> GetMobiles()
        {
            try
            {
                return context.vProducts
                    .Where(t => t.CategoryName == "Mobiles and tablets")
                    .ToList()
                    .Take(10);
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<vProduct>> GetLaptop()
        {
            try
            {
                return context.vProducts
                    .Where(t => t.CategoryName == "Computer&Laptop" && t.Discount == 50)
                    .Take(3)
                    .ToList();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<vProduct>> GetClothes()
        {
            try
            {
                return context.vProducts.Where(t => t.CategoryName == "Clothes").ToList().Take(10);
            }
            catch
            {
                throw;
            }
        }
    }
}
