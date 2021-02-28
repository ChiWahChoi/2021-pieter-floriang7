interface BeerJson {
    name: string;
    abv: number;
    country: string;
}

export class Beer {
    constructor(
        private _name: string,
        private _abv: number,
        private _country: string,
        //reviews: Review[]
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

    addReview() {

    }

    static fromJSON(json: BeerJson): Beer {
        const beer = new Beer(json.name, json.abv, json.country)
        return beer;
    }

}