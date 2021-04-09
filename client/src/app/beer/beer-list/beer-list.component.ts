import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BeerDataService } from '../beer-data.service';
import { BEERS } from '../beer-mock/mock-beers';
import { Beer } from '../beer.model';
import { distinctUntilChanged, debounceTime, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {
  public filterBeerName: string = "";
  public filterBeer$ = new Subject<string>();
  //private _beers: Beer[] = [];
  private _fetchBeers$: Observable<Beer[]> = this._beerDataService.beers$;

  constructor(private _beerDataService: BeerDataService) { 
    this.filterBeer$.pipe(
      distinctUntilChanged(),
      debounceTime(400),
      map(val => val.toLowerCase()),
    )
    .subscribe(val => this.filterBeerName = val);

  }

  get beers$(): Observable<Beer[]> {
    return this._fetchBeers$;
  }

  ngOnInit(): void {
  }

}
