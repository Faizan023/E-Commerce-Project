using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<ProductCategory>> GetCategories();
        Task<ProductCategory> GetCategoryById(int Id);
        Task<ProductCategory> InsertCategory(ProductCategory category);
        Task<ProductCategory> UpdateCategory(ProductCategory category);
        bool DeleteCategory(int Id);
    }

    public class CategoryRepository : ICategoryRepository
    {
        private readonly DbContext context;

        public CategoryRepository(DbContext _context)
        {
            context = _context;
        }

        public async Task<IEnumerable<ProductCategory>> GetCategories()
        {
            try
            {
                return await context.Categories.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<ProductCategory> GetCategoryById(int Id)
        {
            try
            {
                var find = await context.Categories.FindAsync(Id);
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

        public async Task<ProductCategory> InsertCategory(ProductCategory category)
        {
            try
            {
                context.Categories.Add(category);
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return category;
        }

        public async Task<ProductCategory> UpdateCategory(ProductCategory category)
        {
            try
            {
                context.Entry(category).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return category;
        }

        public bool DeleteCategory(int Id)
        {
            var result = false;
            try
            {
                var find = context.Categories.Find(Id);
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