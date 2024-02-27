using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("vWishlist")]
    public class vWishlist
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public DateTimeOffset CreateDateTime { get; set; }
        public DateTimeOffset UpdateDateTime { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public byte[]? Img { get; set; }
        public string? Name { get; set; }
        public int Price { get; set; }
        public string? Measurment { get; set; }
        public string? MesurmentValue { get; set; }
        public string? Color { get; set; }
    }
}
