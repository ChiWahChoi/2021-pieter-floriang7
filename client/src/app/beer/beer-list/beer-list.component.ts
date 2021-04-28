import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { BeerDataService } from '../beer-data.service';
import { Beer } from '../beer.model';
import { distinctUntilChanged, debounceTime, map, filter, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {
  public filterBeerName: string = "";
  public filterBeer$ = new Subject<string>();
  private _beers: Beer[] = [];
  private _fetchBeers$!: Observable<Beer[]>;
  public errorMessage: string = "";

  constructor(private _beerDataService: BeerDataService) { 
    this.filterBeer$.pipe(
      distinctUntilChanged(),
      debounceTime(400),
      map(val => val.toLowerCase()),
    )
    .subscribe(val => this.filterBeerName = val);
    this._beerDataService.beers$.subscribe(
      res => this._beers = res
    );

  }

  get beers$(): Observable<Beer[]> {
    return this._fetchBeers$;
  }

  get beers(): Beer[] {
    return this._beers;
  }

  ngOnInit(): void {
    this._fetchBeers$ = this._beerDataService.beers$.pipe(
      catchError(err => {
        this.errorMessage = err
        return EMPTY;
        })
      );
  }

}
