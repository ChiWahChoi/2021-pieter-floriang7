using Api.Models;

namespace RecipeApi.Models
{
    public class CustomerFavorite
    {
        #region Properties
        public int CustomerId { get; set; }

        public int BeerId { get; set; }

        public Customer Customer { get; set; }

        public Beer Beer { get; set; }
        #endregion
    }
}
