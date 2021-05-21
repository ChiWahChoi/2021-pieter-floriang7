using Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RecipeApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data
{
    public class BeerContext : IdentityDbContext
    {
        public BeerContext(DbContextOptions<BeerContext> options)
            : base(options)
        {
        }

        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if(!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.;Database=beersdb;Trusted_Connection=True");
            }
        }*/

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // BEER
            builder.Entity<Beer>()
                .ToTable("Beers")
                .HasMany(p => p.Reviews)
                .WithOne()
                .IsRequired()
                .HasForeignKey("BeerId");

            builder.Entity<Beer>().Property(p => p.Id).HasColumnName("BeerId");
            builder.Entity<Beer>().Property(p => p.Name).HasMaxLength(255).IsRequired();
            builder.Entity<Beer>().Property(p => p.Abv).IsRequired();
            builder.Entity<Beer>().Property(p => p.Country).HasMaxLength(255).IsRequired();
            builder.Entity<Beer>().Property(p => p.Image_url).HasMaxLength(255).IsRequired();


            // REVIEW
            builder.Entity<Review>()
                .ToTable("Reviews");

            builder.Entity<Review>().Property(r => r.Id).HasColumnName("ReviewId");
            builder.Entity<Review>().Property(p => p.Rating).IsRequired();
            builder.Entity<Review>().Property(p => p.Description).HasMaxLength(255);


            // CUSTOMER
            builder.Entity<Customer>().Property(c => c.LastName).IsRequired().HasMaxLength(50);
            builder.Entity<Customer>().Property(c => c.FirstName).IsRequired().HasMaxLength(50);
            builder.Entity<Customer>().Property(c => c.Email).IsRequired().HasMaxLength(100);
            builder.Entity<Customer>().Ignore(c => c.FavoriteBeers);


            // CUSTOMERFAVORITE
            builder.Entity<CustomerFavorite>().HasKey(f => new { f.CustomerId, f.BeerId });
            builder.Entity<CustomerFavorite>().HasOne(f => f.Customer).WithMany(u => u.Favorites).HasForeignKey(f => f.CustomerId);
            builder.Entity<CustomerFavorite>().HasOne(f => f.Beer).WithMany().HasForeignKey(f => f.BeerId);



            //seeding database
            builder.Entity<Beer>().HasData(
                    new Beer { Id = 1, Name = "Stella", Abv = 4.5, Country = "Belgium", Image_url= "https://www.biernet.nl/images/soort/17524-Stella%20Artois.jpg" },
                    new Beer { Id = 2, Name = "Duvel", Abv = 8.5, Country = "Belgium", Image_url = "https://www.drankgigant.nl/media/catalog/product/cache/5302153a4b78cff75d07c130fe2dbf33/d/u/duvel_1.jpg" },
                    new Beer { Id = 3, Name = "Maes", Abv = 4.0, Country = "Belgium", Image_url = "" },
                    new Beer { Id = 4, Name = "Heiniken", Abv = 4.5, Country = "The Netherlands", Image_url = "" },
                    new Beer { Id = 5, Name = "Mad Jack Max", Abv = 4.5, Country = "The United States", Image_url = "" }
                );
            
            builder.Entity<Review>().HasData(
                    new {Id = 1, Rating = 6.0, Description = "This tasted decent", DateAdded = DateTime.Now, BeerId = 1},
                    new { Id = 2, Rating = 8.0, Description = "This beer tasted good", DateAdded = DateTime.Now, BeerId = 2},
                    new { Id = 3, Rating = 5.5, Description = "This was a mediocre beer", DateAdded = DateTime.Now, BeerId = 3},
                    new { Id = 4, Rating = 9.0, Description = "The taste was sublime", DateAdded = DateTime.Now, BeerId = 4},
                    new { Id = 5, Rating = 6.0, Description = "The beer tasted ok", DateAdded = DateTime.Now, BeerId = 5}

                );
        }

        public DbSet<Beer> Beers { get; set; }
        public DbSet<Customer> Customers { get; set; }
    }
}
