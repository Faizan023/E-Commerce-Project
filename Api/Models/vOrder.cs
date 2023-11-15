using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("vOrders")]
    public class vOrder : Order
    {
        public string? CustomerName { get; set; }
    }
}
