using Microsoft.AspNetCore.Http;
using RannaSoftwareTask2Project.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RannaSoftwareTask2Project.Entity
{
    public class ProductDto:Product
    {
        public IFormFile? FileImage { get; set; }
        public string? CurrentImage { get; set; }
    }
}
