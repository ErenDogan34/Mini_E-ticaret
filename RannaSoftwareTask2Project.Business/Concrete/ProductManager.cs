using Microsoft.AspNetCore.Http;
using RannaSoftwareTask2Project.Business.Abstract;
using RannaSoftwareTask2Project.DataAccess.Abstract;
using RannaSoftwareTask2Project.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RannaSoftwareTask2Project.Business.Concrete
{
    public class ProductManager:IProductService
    {
        private readonly IProductRepository productRepository;


        public ProductManager(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        public async Task<Product> GetByIdProductAsync(int id)
        {
            var products=await productRepository.GetByIdProductAsync(id);
            return products;
        }

        public async Task<List<Product>> GetByIdUserAsync(int id)
        {
            var product=await productRepository.GetByIdUserAsync(id);
            return product;
        }

        public async Task<bool> ProductAddAsync(Product product, IFormFile imageFile)
        {
            await productRepository.ProductAddAsync(product, imageFile);
            return true;
        }

        public async Task<bool> ProductDeleteAsync(int id)
        {
            var result = await productRepository.ProductDeleteAsync(id);
            if(result==false)
            {
                return false;
            }
            return true;
        }

        public async Task<IEnumerable<Product>> ProductGetAllAsync()
        {
            var products = await productRepository.ProductGetAllAsync();
            return products;
        }

        public async Task<bool> ProductUpdate(Product product, IFormFile imageFile, string currentimage)
        {
            var result = await productRepository.ProductUpdate(product,imageFile,currentimage);
            if(result==false)
            {
                return false;
            }
            return true;
        }
    }
}
