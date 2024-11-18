using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RannaSoftwareTask2Project.Entity.Entities
{
    public abstract class BaseEntity
    {
        public BaseEntity()
        {
            CreatedDate = DateTime.Now;
            isActive = true;
        }
        [Key]
        public int? Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? isActive { get; set; }
    }
}
