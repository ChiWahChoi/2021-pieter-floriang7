using Api.Data;
using Microsoft.EntityFrameworkCore;
using RecipeApi.Models;
using System.Linq;

namespace RecipeApi.Data.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly BeerContext _context;
        private readonly DbSet<Customer> _customers;

        public CustomerRepository(BeerContext dbContext)
        {
            _context = dbContext;
            _customers = dbContext.Customers;
        }

        public Customer GetBy(string email)
        {
            return _customers.Include(c => c.Favorites).ThenInclude(f => f.Beer).ThenInclude(r => r.Reviews).SingleOrDefault(c => c.Email == email);
        }

        public void Add(Customer customer)
        {
            _customers.Add(customer);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}

