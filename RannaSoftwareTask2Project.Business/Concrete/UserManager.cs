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
    public class UserManager:IUserService
    {
        private readonly IUserRepository userRepository;

        public UserManager(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public Task<User> GetByIdUserAsync(int id)
        {
            var person = userRepository.GetByIdUserAsync(id);
            return person;
        }

        public async Task<User> GetByUserNameAsync(string name)
        {
            var person = await userRepository.GetByUserNameAsync(name);
            return person;
        }

        public async Task<bool> PersonAddAsync(User user)
        {
            if (user == null)
            {
                return false;
            }
            var result = await userRepository.GetByEmailUser(user);
            if (result == true)
            {
                return false;
            }

            await userRepository.PersonAddAsync(user);
            return true;
        }

        public async Task<bool> PersonDeleteAsync(int id)
        {
            if (id == 0)
            {
                return false;
            }
            await userRepository.PersonDeleteAsync(id);
            return true;
        }

        public async Task<IEnumerable<User>> PersonGetAllAsync()
        {
            var users = await userRepository.PersonGetAllAsync();
            return users;
        }

        public async Task<bool> UpdatePerson(User user)
        {
            var result = await userRepository.UpdatePerson(user);
            if (result == false)
            {
                return false;
            }

            return true;
        }
    }
}
