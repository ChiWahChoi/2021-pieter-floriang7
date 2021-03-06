import { Review } from "./review.model";

interface BeerJson {
    name: string;
    abv: number;
    country: string;
    reviews: string[];
}

export class Beer {
    constructor(
        private _name: string,
        private _abv: number,
        private _country: string,
        private _reviews: Review[]
    ) {}

    get name(): string {
        return this._name;
    }

    get abv(): number {
        return this._abv;
    }

    get country(): string {
        return this._country
    }

    get reviews(): Review[] {
        return this._reviews;
    }

    addReview(review: Review) {

    }

    static fromJSON(json: BeerJson): Beer {
        const beer = new Beer(json.name, json.abv, json.country, []);
        return beer;
    }

}