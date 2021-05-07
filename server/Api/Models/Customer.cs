using Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace RecipeApi.Models
{
    public class Customer
    {
        #region Properties
        public int CustomerId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public ICollection<CustomerFavorite> Favorites { get; private set; }

        public IEnumerable<Beer> FavoriteBeers => Favorites.Select(f => f.Beer);
        #endregion

        #region Constructors
        public Customer()
        {
            Favorites = new List<CustomerFavorite>();
        }
        #endregion

        #region Methods
        public void AddFavoriteBeer(Beer beer)
        {
            Favorites.Add(new CustomerFavorite() { BeerId = beer.Id, CustomerId = CustomerId, Beer = beer, Customer = this });
        }
        #endregion
    }
}

