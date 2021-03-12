using Api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data
{
    public class BeerContext : DbContext
    {
        public BeerContext(DbContextOptions<BeerContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Beer>()
                .HasMany(p => p.Reviews)
                .WithOne()
                .IsRequired()
                .HasForeignKey("BeerId"); //shadow property

            builder.Entity<Beer>().Property(p => p.Name).HasMaxLength(50);

            builder.Entity<Review>().Property(p => p.Rating).IsRequired();
            builder.Entity<Review>().Property(p => p.Description).IsRequired().HasMaxLength(200);


            //seeding database
            builder.Entity<Beer>().HasData(
                    new Beer { Id = 1, Name = "Stella", Abv = 4.5, Country = "Belgium"},
                    new Beer { Id = 2, Name = "Duvel", Abv = 8.5, Country = "Belgium" },
                    new Beer { Id = 3, Name = "Maes", Abv = 4.0, Country = "Belgium" }
                );

            builder.Entity<Review>().HasData(
                    new {Id = 1, Rating = 4, Description = "This is the description of review 1", BeerId = 1},
                    new { Id = 2, Rating = 3, Description = "This is the description of review 2", BeerId = 2},
                    new { Id = 3, Rating = 5, Description = "This is the description of review 3", BeerId = 3},
                    new { Id = 3, Rating = 2, Description = "This is the description of review 4", BeerId = 3 }

                );
        }

        public DbSet<Beer> Beers { get; set; }

    }
}
