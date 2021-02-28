import { Beer } from '../beer.model';

const JsonBeers = [
    {
        name: "Stella",
        abv: 4.5,
        country: "Belgium"
    },
    {
        name: "Duvel",
        abv: 8.5,
        country: "Belgium"
    },
    {
        name: "Maes",
        abv: 4.0,
        country: "Belgium"
    }
];

export const BEERS: Beer[] = JsonBeers.map(Beer.fromJSON);