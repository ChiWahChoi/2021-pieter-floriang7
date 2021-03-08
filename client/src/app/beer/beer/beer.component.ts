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
  constructor() { }

  addNewReview(review: Review) {
    this.beer.reviews.push(review);
  }

  ngOnInit(): void {
  }

}
