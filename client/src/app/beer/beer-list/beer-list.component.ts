import { Component, OnInit } from '@angular/core';
import { BeerDataService } from '../beer-data.service';
import { BEERS } from '../beer-mock/mock-beers';
import { Beer } from '../beer.model';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {
  

  constructor(private _beerDataService: BeerDataService) { }

  get beers(): Beer[] {
    return this._beerDataService.beers;
  }
  

  ngOnInit(): void {
  }

}
