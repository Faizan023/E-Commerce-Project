using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("ProductCategories")]
    public class ProductCategory
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTimeOffset CreateDateTime { get; set; }
        public DateTimeOffset? UpdateDateTime { get; set; }
        public int CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
    }
}
