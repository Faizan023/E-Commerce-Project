using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Models;

namespace Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<vProduct>> GetProducts();
        Task<vProduct> GetProductById(int id);
        Task<Product> InsertProduct(Product product);
        Task<Product> UpdateProduct(Product product);
        Task DeleteProduct(int Id);
    }

    public class ProductRepository : IProductRepository
    {
        private readonly Context context;

        public ProductRepository(Context _context)
        {
            context = _context;
        }

        public async Task<IEnumerable<vProduct>> GetProducts()
        {
            try
            {
                return await context.vProducts.OrderByDescending(t => t.Id).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<vProduct> GetProductById(int Id)
        {
            try
            {
                var find = await context.vProducts.FindAsync(Id);
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
                // Convert.FromBase64String(product.Img);
                context.Entry(product).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }           
            return product;
        }

        public async Task DeleteProduct(int Id)
        {
            try
            {
                var product = context.Products.Find(Id);
                if (product != null)
                {
                    context.Products.Remove(product);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
