using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data
{
    public class BeerDataInitializer
    {

        private readonly BeerContext _dbContext;

        public BeerDataInitializer(BeerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void InitializeData()
        {
            /*_dbContext.Database.EnsureDeleted();
            if (_dbContext.Database.EnsureCreated())
            {
                //seeding the database with Beers, see DBContext               
            }*/
        }

    }
}
