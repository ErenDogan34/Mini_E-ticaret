using Microsoft.AspNetCore.Http;
using RannaSoftwareTask2Project.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RannaSoftwareTask2Project.DataAccess.Extension
{
    public static class ImageUploadService
    {
        public async static void ImageUpload(Product product, IFormFile imageFile)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var uiProjectPath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "RannaSoftwareTask2Project.UI", "wwwroot", "images");

                if (!Directory.Exists(uiProjectPath))
                {
                    Directory.CreateDirectory(uiProjectPath);
                }

                var filePath = Path.Combine(uiProjectPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                product.Image = $"/images/{fileName}";
            }

        }
    }
}
