using Microsoft.AspNetCore.Http;
using RannaSoftwareTask2Project.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RannaSoftwareTask2Project.DataAccess.Abstract
{
    public interface IProductRepository
    {
        Task<bool> ProductAddAsync(Product product, IFormFile imageFile);
        Task<bool> ProductDeleteAsync(int id);
        Task<IEnumerable<Product>> ProductGetAllAsync();
        Task<Product> GetByIdProductAsync(int id);
        Task<bool> ProductUpdate(Product product, IFormFile imageFile, string currentimage);
        Task<List<Product>> GetByIdUserAsync(int id);

    }
}
