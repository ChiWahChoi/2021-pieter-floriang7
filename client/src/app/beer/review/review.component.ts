import { Component, Input, OnInit } from '@angular/core';
import { BeerDataService } from '../beer-data.service';
import { Beer } from '../beer.model';
import { Review } from '../review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() public review!: Review;
  @Input() public beer!: Beer;
  constructor(private _beerDataService: BeerDataService) { }

  ngOnInit(): void {
  }

  deleteReview() {
    this._beerDataService.deleteReview(this.beer, this.review);
    console.log("beerid " + this.beer.id + "- reviewid " + this.review.id)
  }

}
