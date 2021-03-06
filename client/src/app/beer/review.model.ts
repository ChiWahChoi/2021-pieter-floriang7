interface ReviewJson {
    rating: number;
    description: string;
    dateAdded: string;
}

export class Review {

    constructor(
        private _rating: number, 
        private _description: string, 
        private _dateAdded: Date
        ) {}
    
    get rating(): number {
        return this._rating;
    }

    get description(): string {
        return this._description;
    }

    get dateAdded(): Date {
        return this._dateAdded;
    }

    static fromJSON(json: ReviewJson): Review {
        const review = new Review(json.rating, json.description, new Date(json.dateAdded));
        return review;
    }

}