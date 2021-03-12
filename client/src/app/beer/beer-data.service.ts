import { Injectable } from '@angular/core';
import { BEERS } from './beer-mock/mock-beers';
import { Review } from './review.model';

@Injectable({
  providedIn: 'root'
})
export class BeerDataService {
  private _beers = BEERS;
  
  constructor() { }

  get beers() {
    return this._beers;
  }


}
