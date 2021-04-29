import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BeerDataService } from '../beer-data.service';
import { Beer } from '../beer.model';
import { Review } from '../review.model';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})

export class AddReviewComponent implements OnInit {
  @Input() public beer!: Beer;
  //@Output() public newReview = new EventEmitter<Review>();
  public review!: FormGroup;
  constructor(private fb: FormBuilder, private _beerDataService: BeerDataService) { }

  /*addReview(reviewScore: HTMLInputElement): boolean {
    const review = new Review(Number.parseInt(reviewScore.value), "lorem ipsum lorem ipsum lorem ipsum", new Date())
    this.newReview.emit(review);
    return false;
  }*/

  onSubmit() {
    //this.newReview.emit(new Review(this.review.value.rating, this.review.value.description, new Date()));
    this._beerDataService.addNewReview(this.beer, new Review(this.review.value.rating, this.review.value.description, new Date()));
  }

  getErrorMessage(errors: any): string {
    if(errors.required) {
      return "is required";
    } else if(errors.invalidRating) {
      return "give a rating between 0 and 10"
    }
    return 'an error occurred'
  }

  ngOnInit(): void {
    this.review = this.fb.group({
      rating: ['', Validators.required],
      description: ['']
    },
    {validator: validateRating}
    );
  }
}



function validateRating(control: FormGroup) : { [key: string]: any } {
  if(
    parseInt(control.get('rating')?.value) < 0 || parseInt(control.get('rating')?.value) > 10
  ) {
    return {invalidRating: true};
  }
  return {invalidRating: false};
}