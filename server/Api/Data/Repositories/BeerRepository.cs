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

        public void Add(int id, Review review)
        {
            _beers.Include(b => b.Reviews).SingleOrDefault(b => b.Id == id).Reviews.Add(review);
        }

        public void Delete(int id, Review review)
        {
            _beers.Include(b => b.Reviews).SingleOrDefault(b => b.Id == id).Reviews.Remove(review);
        }

        public IEnumerable<Beer> GetAll()
        {
            return _beers.AsNoTracking().Include(b => b.Reviews).ToList();
        }

        public Beer GetBy(int id)
        {
            return _beers.AsNoTracking().Include(b => b.Reviews).SingleOrDefault(b => b.Id == id);
        }

        public IEnumerable<Beer> GetTopRated()
        {
            return _beers.Include(b => b.Reviews).Where(b => b.Reviews.Count != 0).OrderByDescending(b => b.Reviews.Average(r => r.Rating)).ToList();
        }

        public IEnumerable<Beer> GetBy(string name = null, string country = null, string abv = null)
        {
            var beers = _beers.AsNoTracking().Include(b => b.Reviews).AsQueryable();
            if (!string.IsNullOrEmpty(name))
                beers = beers.Where(b => b.Name.IndexOf(name) >= 0);
            if (!string.IsNullOrEmpty(country))
                beers = beers.Where(b => b.Country == country);
            if (!string.IsNullOrEmpty(abv))
                beers = beers.Where(b => b.Abv.ToString().Equals(abv));
            return beers.OrderBy(b => b.Name).ToList();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public bool TryGetBeer(int id, out Beer beer)
        {
            beer = _context.Beers.Include(b => b.Reviews).FirstOrDefault(b => b.Id == id);
            return beer != null;
        }

        public void Update(Beer beer)
        {
            _context.Update(beer);
        }
    }
}
