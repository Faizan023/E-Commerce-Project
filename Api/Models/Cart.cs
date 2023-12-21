using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using MOdels;

namespace Models
{
    [Table("Cart")]
    public class Cart 
    {
        [Key]
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public DateTimeOffset CreateDateTime { get; set; }
        public DateTimeOffset? UpdateDateTime { get; set; }
        public int Quantity { get; set; }
        public int CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
    }
}
