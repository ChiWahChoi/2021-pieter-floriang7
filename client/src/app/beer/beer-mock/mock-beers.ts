import { Beer } from '../beer.model';

const JsonBeers = [
    {
        id: 1,
        name: "Stella",
        abv: 4.5,
        country: "Belgium",
        image_url: "https://imageurl",
        reviews: []
    },
    {
        id: 2,
        name: "Duvel",
        abv: 8.5,
        country: "Belgium",
        image_url: "https://imageurl",
        reviews: []
    },
    {
        id: 3,
        name: "Maes",
        abv: 4.0,
        country: "Belgium",
        image_url: "https://imageurl",
        reviews: []
    }
];

export const BEERS: Beer[] = JsonBeers.map(Beer.fromJSON);