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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if(!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.;Database=beersdb;Trusted_Connection=True");
            }
        }

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
            /*builder.Entity<Beer>().HasData(
                    new Beer { Id = 1, Name = "Stella", Abv = 4.5, Country = "Belgium"},
                    new Beer { Id = 2, Name = "Duvel", Abv = 8.5, Country = "Belgium" },
                    new Beer { Id = 3, Name = "Maes", Abv = 4.0, Country = "Belgium" }
                );
            */
            /*builder.Entity<Review>().HasData(
                    new {Id = 1, Rating = 4, Description = "This is the description of review 1", DateAdded = DateTime.Now, BeerId = 1},
                    new { Id = 2, Rating = 3, Description = "This is the description of review 2", DateAdded = DateTime.Now, BeerId = 2},
                    new { Id = 3, Rating = 5, Description = "This is the description of review 3", DateAdded = DateTime.Now, BeerId = 3},
                    new { Id = 3, Rating = 2, Description = "This is the description of review 4", DateAdded = DateTime.Now, BeerId = 3 }

                );*/
        }

        public DbSet<Beer> Beers { get; set; }
        public DbSet<Customer> Customers { get; set; }
    }
}
