using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class ReviewDTO
    {
        [Required]
        [Range(0, 10)]
        public double Rating { get; set; }
        [Required]
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
