using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RannaSoftwareTask2Project.Entity.Entities
{
    public class Product:BaseEntity
    {
        public string? ProductName { get; set; }
        public string? ProductCode { get; set; }
        public string? ProductPrice { get; set; }
        public string? Image { get; set; }
        public int? UserId { get; set; }
    }
}
