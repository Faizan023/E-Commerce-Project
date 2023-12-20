using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("vProduct")]
    public class vProduct : Product
    {
        public string? BrandName { get; set; }
        public string? CategoryName { get; set; }
    }
}
