import { Beer } from '../beer.model';

const JsonBeers = [
    {
        name: "Stella",
        abv: 4.5,
        country: "Belgium",
        reviews: []
    },
    {
        name: "Duvel",
        abv: 8.5,
        country: "Belgium",
        reviews: []
    },
    {
        name: "Maes",
        abv: 4.0,
        country: "Belgium",
        reviews: []
    }
];

export const BEERS: Beer[] = JsonBeers.map(Beer.fromJSON);