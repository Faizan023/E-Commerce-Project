using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Models;
using MOdels;

public class Context : DbContext
{
    public Context(DbContextOptions<Context> options)
        : base(options) { }

    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductCategory> Categories { get; set; }
    public DbSet<Sale> Sales { get; set; }
    public DbSet<Brand> Brands { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<vOrder> vOrders { get; set; }
    public DbSet<vProduct> vProducts { get; set; }
    public DbSet<vCart> vCarts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Brand>()
            .HasMany(p => p.products)
            .WithOne(c => c.brand)
            .HasForeignKey(c => c.BrandId)
            .OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(modelBuilder);
    }

    internal object Find(int id)
    {
        throw new NotImplementedException();
    }
}
