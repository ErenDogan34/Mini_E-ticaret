using RannaSoftwareTask2Project.Entity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RannaSoftwareTask2Project.Business.Abstract
{
    public interface IUserService
    {
        Task<bool> PersonAddAsync(User user);
        Task<bool> PersonDeleteAsync(int id);
        Task<IEnumerable<User>> PersonGetAllAsync();
        Task<User> GetByUserNameAsync(string name);
        Task<User> GetByIdUserAsync(int id);
        Task<bool> UpdatePerson(User user);
    }
}
