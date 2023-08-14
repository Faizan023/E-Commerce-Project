using Microsoft.EntityFrameworkCore;
using Models;

public class DbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public DbContext(DbContextOptions<DbContext> options)
        : base(options) { }

    public DbSet<Customer> Manages { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductCategory> Categories { get; set; }
    public DbSet<Sale> Sales { get; set; }
    public DbSet<Brand> Brands { get; set; }
    public DbSet<User> Users { get; set; }
}
