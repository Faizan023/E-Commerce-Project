using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Orders")]
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int Quantity { get; set; }
        public int Amount { get; set; }
        public int ProductId { get; set; }
        public string PaymentMethod { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public string DeliveryAddress { get; set; }
        public string BillingAddress { get; set; }
        public DateTime DeliveryDate { get; set; }
        public int DeliveryCharge { get; set; }
        public string Status { get; set; }
        public DateTimeOffset CreatedDateTime { get; set; }
        public DateTimeOffset? UpdatedDateTime { get; set; }
        public int CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
    }
}
