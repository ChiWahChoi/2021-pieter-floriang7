using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    interface IBeerRepository
    {
        Beer GetBy(int id);
        bool TryGetBeer(int id, out Beer beer);
        IEnumerable<Beer> GetAll();
        IEnumerable<Beer> GetBy(string name = null, string country = null, string abv = null);
        void Add(Review review);
        void Delete(Review review);
        void Update(Review review);
        void SaveChanges();
    }
}
