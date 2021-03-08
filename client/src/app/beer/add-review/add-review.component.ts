import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Review } from '../review.model';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  @Output() public newReview = new EventEmitter<Review>();
  constructor() { }

  addReview(reviewScore: HTMLInputElement): boolean {
    const review = new Review(Number.parseInt(reviewScore.value), "lorem ipsum lorem ipsum lorem ipsum", new Date())
    this.newReview.emit(review);
    return false;
  }

  ngOnInit(): void {
  }

}
