using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public interface ISaleRepository
    {
        Task<IEnumerable<Sale>> GetSales();
        Task<Sale> GetSaleById(int Id);
        Task<Sale> InsertSale(Sale sale);
        Task<Sale> UpdateSale(Sale sale);
        bool DeleteSale(int Id);
    }

    public class SaleRepository : ISaleRepository
    {
        private readonly DbContext context;

        public SaleRepository(DbContext _context)
        {
            context = _context;
        }

        public async Task<IEnumerable<Sale>> GetSales()
        {
            try
            {
                return await context.Sales.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Sale> GetSaleById(int Id)
        {
            try
            {
                var find = await context.Sales.FindAsync(Id);
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

        public async Task<Sale> InsertSale(Sale sale)
        {
            try
            {
                context.Sales.Add(sale);
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return sale;
        }

        public async Task<Sale> UpdateSale(Sale sale)
        {
            try
            {
                context.Entry(sale).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
            return sale;
        }

        public bool DeleteSale(int Id)
        {
            var result = false;
            try
            {
                var find = context.Sales.Find(Id);
                if (find != null)
                {
                    context.Remove(find).State = EntityState.Deleted;
                    context.SaveChangesAsync();
                    return true;
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
    }
}
