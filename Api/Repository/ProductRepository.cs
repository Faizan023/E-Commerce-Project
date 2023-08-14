using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProducts();
        Task<Product> GetProductById(int id);
        Task<Product> InsertProduct(Product product);
        Task<Product> UpdateProduct(Product product);
        bool DeleteProduct(int Id);
    }

    public class ProductRepository : IProductRepository
    {
        private readonly DbContext context;

        public ProductRepository(DbContext _context)
        {
            context = _context;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            try
            {
                return await context.Products.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Product> GetProductById(int Id)
        {
            try
            {
                var find = await context.Products.FindAsync(Id);
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

        public async Task<Product> InsertProduct(Product product)
        {
            try
            {
                context.Products.Add(product);
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return product;
        }

        public async Task<Product> UpdateProduct(Product product)
        {
            try
            {
                context.Entry(product).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return product;
        }

        public bool DeleteProduct(int Id)
        {
            var result = false;
            try
            {
                var find = context.Products.Find(Id);
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
