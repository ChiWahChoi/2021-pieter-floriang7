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
  private _review: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private _beerDataService: BeerDataService) { }


  onSubmit() {
    this._beerDataService.addNewReview(this.beer, new Review(this.review.value.rating, this.review.value.description, new Date()));
  }

  get review(): FormGroup {
    return this._review;
  }

  getErrorMessage(errors: any): string {
    console.log(errors)
    if(errors.required) {
      return "is required";
    } else if(errors.invalidRating) {
      return "give a rating between 0 and 10"
    }
    return 'an error occurred'
  }

  ngOnInit(): void {
    this._review = this.fb.group({
      rating: ['', Validators.required],
      description: ['', Validators.required]
    },
    {validator: validateRating}
    );
  }
}



function validateRating(control: FormGroup) : { [key: string]: any } | null {
  console.log('VALIDATE RATING')
  if(
    parseInt(control.get('rating')!.value) < 0 || parseInt(control.get('rating')!.value) > 10
  ) {
    console.log('return invalidrating');
    return {invalidRating: true};
  }
  return null;
}