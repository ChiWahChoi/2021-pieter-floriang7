using Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    //[ApiConventionType(typeof(DefaultApiConventions))]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class BeersController : ControllerBase
    {

        private readonly IBeerRepository _beerRepository;

        public BeersController(IBeerRepository context)
        {
            _beerRepository = context;
        }

        #region BEER

        /// <summary>
        /// GET returns all beers
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Beer> GetBeers(string name = null, string country = null, string abv = null)
        {
            if (string.IsNullOrEmpty(name) && string.IsNullOrEmpty(country) && string.IsNullOrEmpty(abv))
                return _beerRepository.GetAll();
            return _beerRepository.GetBy(name, country, abv);
        }

        /// <summary>
        /// GET returns a beer by id
        /// </summary>
        /// <param name="id">id of a beer</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public ActionResult<Beer> GetBeer(int id)
        {
            Beer beer = _beerRepository.GetBy(id);
            if (beer == null)
                return NotFound();
            return beer;
        }

        #endregion



        #region REVIEW

        /// <summary>
        /// POST adds a review to a beer
        /// </summary>
        /// <param name="id"> id of beer</param>
        /// <param name="review">review to be added</param>
        /// <returns></returns>
        [HttpPost("{id}/reviews")]
        public ActionResult<Review> PostReview(int id, Review review)
        {
            Console.WriteLine("PostReview Called");
            if(!_beerRepository.TryGetBeer(id, out var beer))
            {
                return NotFound();
            }

            var reviewToCreate = new Review(review.Rating, review.Description);
            beer.AddReview(reviewToCreate);
            _beerRepository.Update(beer);
            _beerRepository.SaveChanges();
            return CreatedAtAction(nameof(GetReview), new { id = beer.Id, reviewId = reviewToCreate.Id }, reviewToCreate);
        }

        /// <summary>
        /// DELETE deletes a review
        /// </summary>
        /// <param name="id">id of a beer</param>
        /// <param name="reviewId">id of a review</param>
        /// <returns></returns>
        [HttpDelete("{id}/reviews/{reviewId}")]
        public IActionResult DeleteReview(int id, int reviewId)
        {
            if (!_beerRepository.TryGetBeer(id, out var beer))
            {
                return NotFound();
            }

            var review = beer.GetReview(reviewId);
            if (review == null)
            {
                return NotFound();
            }

            beer.DeleteReview(review);
            _beerRepository.SaveChanges();
            return NoContent();

        }

        /// <summary>
        /// PUT updates a review
        /// </summary>
        /// <param name="id">id of a beer</param>
        /// <param name="reviewId">id of a review</param>
        /// <param name="review">review that will be updated</param>
        /// <returns></returns>
        [HttpPut("{id}/reviews/{reviewId}")]
        public IActionResult PutReview(int id, int reviewId, Review review)
        {
            if (!_beerRepository.TryGetBeer(id, out var beer))
            {
                return NotFound();
            }

            if (reviewId != review.Id)
            {
                return BadRequest();
            }

            _beerRepository.Update(review);
            _beerRepository.SaveChanges();
            return NoContent();
        }

        /// <summary>
        /// GET returns a review by id
        /// </summary>
        /// <param name="id">id of a beer</param>
        /// <param name="reviewId"> id of a review</param>
        /// <returns></returns>
        [HttpGet("{id}/reviews/{reviewId}")]
        public ActionResult<Review> GetReview(int id, int reviewId)
        {
            if (!_beerRepository.TryGetBeer(id, out var beer))
            {
                return NotFound();
            }
            Review review = beer.GetReview(reviewId);
            return review;
        }


        #endregion

    }
}
