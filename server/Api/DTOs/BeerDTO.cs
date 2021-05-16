using Api.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class BeerDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public double Abv { get; set; }
        [Required]
        public string Country { get; set; }
        public string Image_url { get; set; }

        public IList<Review> Reviews { get; private set; }
    }
}
