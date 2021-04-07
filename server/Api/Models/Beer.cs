using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class Beer
    {
        #region Properties
        public int Id { get; set; }

        public string Name { get; set; }

        public double Abv { get; set; }

        public string Country { get; set; }

        public string Image_url { get; set; }

        public ICollection<Review> Reviews { get; private set; }
        #endregion

        #region Constructors
        public Beer()
        {
            Reviews = new List<Review>();
        }
        public Beer(string name, double abv, string country) : this()
        {
            Name = name;
            Abv = abv;
            Country = country;
        }
        #endregion

        #region Methods
        public void AddReview(Review review) => Reviews.Add(review);

        public void DeleteReview(Review review) => Reviews.Remove(review);

        public Review GetReview(int id) => Reviews.SingleOrDefault(i => i.Id == id);
        #endregion

    }
}
