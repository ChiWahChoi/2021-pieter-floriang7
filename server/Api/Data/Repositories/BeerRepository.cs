using Api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.Repositories
{
    public class BeerRepository : IBeerRepository
    {
        private readonly BeerContext _context;
        private readonly DbSet<Beer> _beers;

        public BeerRepository(BeerContext dbContext)
        {
            _context = dbContext;
            _beers = _context.Beers;
        }

        public void Add(Review review)
        {
            throw new NotImplementedException();
        }

        public void Delete(Review review)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Beer> GetAll()
        {
            throw new NotImplementedException();
        }

        public Beer GetBy(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Beer> GetBy(string name = null, string country = null, string abv = null)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }

        public bool TryGetBeer(int id, out Beer beer)
        {
            throw new NotImplementedException();
        }

        public void Update(Review review)
        {
            throw new NotImplementedException();
        }
    }
}
