using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("vOrder")]
    public class vOrder : Order
    {
        public string? CustomerName { get; set; }
        public string? Name { get; set; } //Product Name
    }
}
