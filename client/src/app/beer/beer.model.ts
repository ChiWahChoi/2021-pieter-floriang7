import { Review, ReviewJson } from "./review.model";

interface BeerJson {
    id: number;
    name: string;
    abv: number;
    country: string;
    image_url: string;
    reviews: ReviewJson[]; // reviews: ReviewJson[];
}

export class Beer {
    private _id!: number;
    constructor(    
        private _name: string,
        private _abv: number,
        private _country: string,
        private _image_url: string,
        private _reviews = new Array<Review>()
    ) {}

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get abv(): number {
        return this._abv;
    }

    get country(): string {
        return this._country
    }

    get image_url(): string {
        return this._image_url;
    }

    get reviews(): Review[] {
        return this._reviews;
    }

    addReview(review: Review) {

    }

    static fromJSON(json: BeerJson): Beer {
        const beer = new Beer(json.name, json.abv, json.country, json.image_url, json.reviews.map(Review.fromJSON));
        beer._id = json.id
        return beer;
    }

    toJSON(): BeerJson {
        return <BeerJson> {
            name: this.name,
            abv: this.abv,
            country: this.country,
            image_url: this.image_url,
            reviews: this.reviews.map(r => r.toJSON())
        }
    }

}