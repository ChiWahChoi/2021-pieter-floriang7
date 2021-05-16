export interface ReviewJson {
    id: number;
    rating: number;
    description: string;
    dateAdded: string;
}

export class Review {
    private _id!: number;
    constructor(
        private _rating: number, 
        private _description: string, 
        private _dateAdded: Date
        ) {}
    
    get id(): number {
        return this._id
    }    
        
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
        review._id = json.id;
        return review;
    }

    toJSON(): ReviewJson {
        return { id: this.id, rating: this.rating, description: this.description, dateAdded: this.dateAdded.toISOString() };
    }

}