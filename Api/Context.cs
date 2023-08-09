using Microsoft.EntityFrameworkCore;
using Models;

public class DbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public DbContext(DbContextOptions<DbContext> options)
        : base(options) { }

    public DbSet<Customer> Customers { get; set; }
    public object Customer { get; internal set; }
    public DbSet<Product> Products { get; set; }
}
