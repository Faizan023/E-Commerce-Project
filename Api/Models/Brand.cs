using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Brands")]
    public class Brand
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTimeOffset CreateDateTime { get; set; }
        public DateTimeOffset? UpdateDateTime { get; set; }
        public int Createdby { get; set; }
        public int? UpdatedBy { get; set; }
       
    }
}
