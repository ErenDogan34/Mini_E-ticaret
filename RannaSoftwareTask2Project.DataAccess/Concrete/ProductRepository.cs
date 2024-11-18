using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RannaSoftwareTask2Project.DataAccess.Abstract;
using RannaSoftwareTask2Project.DataAccess.Extension;
using RannaSoftwareTask2Project.Entity.Context;
using RannaSoftwareTask2Project.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RannaSoftwareTask2Project.DataAccess.Concrete
{
    public class ProductRepository:IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Product> GetByIdProductAsync(int id)
        {
            var product=await _context.Products.FindAsync(id);
            return product;
        }

        public async Task<List<Product>> GetByIdUserAsync(int id)
        {
            var product = await _context.Products.Where(x=>x.UserId==id && x.isActive==true).ToListAsync();
            return product;
        }

        public async Task<bool> ProductAddAsync(Product product, IFormFile imageFile)
        {
            try
            {
                ImageUploadService.ImageUpload(product,imageFile);
                await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();


                return true;
            }
            catch
            {
                return false;
            }

        }

        public async Task<bool> ProductDeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            try
            {
                product.isActive = false;
                _context.Products.Update(product);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }

        }

        public async Task<IEnumerable<Product>> ProductGetAllAsync()
        {
            return await _context.Products.Where(x => x.isActive == true).ToListAsync();
        }

        public async Task<bool> ProductUpdate(Product product, IFormFile imageFile,string currentimage)
        {
            try
            {
                product.Image = currentimage;
                if (imageFile!=null)
                {
                    ImageUploadService.ImageUpload(product, imageFile);
                }
                _context.Products.Update(product);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
