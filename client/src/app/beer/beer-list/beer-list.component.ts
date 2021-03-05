import { Component, OnInit } from '@angular/core';
import { BEERS } from '../beer-mock/mock-beers';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {
  private _beers = BEERS;

  constructor() { }

  get beers() {
    return this._beers;
  }

  ngOnInit(): void {
  }

}
