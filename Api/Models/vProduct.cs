using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("vProduct")]
    public class vProduct 
    {
        [Key]
        public int Id { get; set; }
        public byte[] Img { get; set; }
        public string? Name { get; set; }
        public int CategoryId { get; set; }
        public string? Description { get; set; }
        public int Price { get; set; }
        public int Discount { get; set; }
        public int Quantity { get; set; }
        public string? Color { get; set; }
        public string? Measurment { get; set; }
        public string? MesurmentValue { get; set; }
        public int BrandId { get; set; }
        public int? DeliveryCharge { get; set; }
        public DateTimeOffset CreatedDateTime { get; set; }
        public DateTimeOffset? UpdatedDateTime { get; set; }
        public int CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public Brand brand{get;set;}
        public string? BrandName { get; set; }
        public string? CategoryName { get; set; }
    }
}
