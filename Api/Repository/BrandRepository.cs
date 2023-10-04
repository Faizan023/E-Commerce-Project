using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface IBrandRepository
    {
        Task<IEnumerable<Brand>> GetBrands();
        Task<Brand> GetBrandById(int Id);
        Task<Brand> InsertBrand(Brand brand);
        Task<Brand> UpdateBrand(Brand brand);
        bool DeleteBrand(int Id);
        List<string> BrandValidation(Brand brand);
    }

    public class BrandRepository : IBrandRepository
    {
        private readonly Context context;

        public BrandRepository(Context _context)
        {
            context = _context;
        }

        public async Task<IEnumerable<Brand>> GetBrands()
        {
            try
            {
                return await context.Brands.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Brand> GetBrandById(int Id)
        {
            try
            {
                var find = await context.Brands.FindAsync(Id);
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

        public async Task<Brand> InsertBrand(Brand brand)
        {
            try
            {
                context.Brands.Add(brand);
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return brand;
        }

        public async Task<Brand> UpdateBrand(Brand brand)
        {
            try
            {
                context.Entry(brand).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return brand;
        }

        public bool DeleteBrand(int Id)
        {
            var result = false;
            try
            {
                var find = context.Brands.Find(Id);
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

        public List<string> BrandValidation(Brand brand)
        {
            List<string> errors = new List<string>();
            var result = context.Brands.FirstOrDefault(
                t => t.Name.ToLower() == brand.Name.ToLower()
            );
            if (result != null)
            {
                errors.Add("This Brand Already Exist");
            }
            return errors;
        }
    }
}
