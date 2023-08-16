using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Customers")]
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public DateTimeOffset CreatedDateTime { get; set; }
        public int CreatedBy { get; set; }
        public DateTimeOffset? UpdatedDateTime { get; set; }
        public int? UpdatedBy { get; set; }
        public bool Active { get; set; }
        public DateTimeOffset ActivationDate { get; set; }
        public string ActivationKey { get; set; }
    }
}
