import { Component, Input, OnInit } from '@angular/core';
import { Beer } from '../beer.model';
import { Review } from '../review.model';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css']
})
export class BeerComponent implements OnInit {
  @Input() public beer!: Beer;
  private _averageRating: number = 0;
  constructor() { }

  addNewReview(review: Review) {
    this.beer.reviews.push(review);
  }

  ngOnInit(): void {
  }

  get averageRating() : number {
    if(this.beer.reviews.length != 0) {
      const ratingList: number[] = this.beer.reviews.map(r => r.rating);
      const average: number = ratingList.reduce( ( p, c ) => p + c, 0 ) / ratingList.length;
      this._averageRating = average;
    }
    return this._averageRating;
  }
}
