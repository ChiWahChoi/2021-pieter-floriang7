using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public interface IBeerRepository
    {
        Beer GetBy(int id);
        bool TryGetBeer(int id, out Beer beer);
        IEnumerable<Beer> GetAll();
        IEnumerable<Beer> GetBy(string name = null, string country = null, string abv = null);
        IEnumerable<Beer> GetTopRated();
        void Add(int id, Review review);
        void Delete(int id, Review review);
        void SaveChanges();
        void Update(Beer beer);
    }
}
