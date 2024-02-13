using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface IhomepageRepository
    {
        Task<IEnumerable<vProduct>> GetFashion();
        Task<IEnumerable<vProduct>> GetMobiles();
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
    }
}
