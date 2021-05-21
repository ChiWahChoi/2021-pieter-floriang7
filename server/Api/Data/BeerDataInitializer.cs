using Microsoft.AspNetCore.Identity;
using RecipeApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data
{
    public class BeerDataInitializer
    {

        private readonly BeerContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;


        public BeerDataInitializer(BeerContext dbContext, UserManager<IdentityUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task InitializeDataAsync()
        {
            //_dbContext.Database.EnsureDeleted();
            if (_dbContext.Database.EnsureCreated())
            {
                Customer customer = new Customer { Email = "admin@hogent.be", FirstName = "Adam", LastName = "Master" };
                _dbContext.Customers.Add(customer);
                await CreateUser(customer.Email, "Admin123&");
                Customer student = new Customer { Email = "student@hogent.be", FirstName = "Student", LastName = "Hogent" };
                _dbContext.Customers.Add(student);
                await CreateUser(student.Email, "Student123&");
                _dbContext.SaveChanges();
            }
        }

        private async Task CreateUser(string email, string password)
        {
            var user = new IdentityUser { UserName = email, Email = email };
            await _userManager.CreateAsync(user, password);
        }

    }
}
