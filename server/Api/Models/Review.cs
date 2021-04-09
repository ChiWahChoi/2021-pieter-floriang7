using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class Review
    {
        #region Properties
        public int Id { get; set; }
        [Required]
        [Range(0, 10)]
        public int Rating { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        #endregion

        #region Constructors    
        public Review()
        {
            DateAdded = DateTime.Now;
        }
        public Review(int rating, string description)
        {
            Rating = rating;
            Description = description;
            DateAdded = DateTime.Now;
        }
        #endregion

        #region Methods

        #endregion
    }
}
