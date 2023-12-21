using System.ComponentModel.DataAnnotations.Schema;
using Models;

namespace MOdels
{
    [Table("vCart")]
    public class vCart : Cart
    {
        
        public byte[]? Img { get; set; }
        public string? Name { get; set; }
        public int price { get; set; }
        public string? Measurment { get; set; }
        public string? MesurmentValue { get; set; }
    }
}
