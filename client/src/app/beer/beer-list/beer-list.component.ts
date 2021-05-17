import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { BeerDataService } from '../beer-data.service';
import { Beer } from '../beer.model';
import { distinctUntilChanged, debounceTime, map, filter, catchError, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {
  public filterBeerName: string = "";
  public filterBeerCountry: string = "";
  public filterBeer$ = new Subject<string>();
  private _beers: Beer[] = [];
  private _fetchBeers$!: Observable<Beer[]>;
  public errorMessage: string = "";

  constructor(private _beerDataService: BeerDataService, private _router: Router, private _route: ActivatedRoute) { 
    this.filterBeer$.pipe(
      distinctUntilChanged(),
      debounceTime(400),
      map(val => val.toLowerCase()),
    )
    .subscribe(val => {
      const params = val ? { queryParams: { filter: val } } : undefined;
      this._router.navigate(['beer/list'], params);
    });

    this._fetchBeers$ = this._route.queryParams
      .pipe(
        switchMap((newParams) => {
          // set the value of the input field with the url parameter as well
          if (newParams['filter']) {
            this.filterBeerName = newParams['filter'];
          }
          // when the queryparameter changes, take the filter parameter and use it to ask
          // the service for all recipes with this filter in their name
          // this._beerDataService.getBeers$(newParams['filter']).subscribe(
          return this._beerDataService.getBeers$(newParams['filter']);
        })
      )
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      );

  }

  get beers$(): Observable<Beer[]> {
    return this._fetchBeers$;
  }

  get beers(): Beer[] {
    return this._beers;
  }

  ngOnInit(): void {
    /*this._fetchBeers$ = this._beerDataService.beers$.pipe(
      catchError(err => {
        this.errorMessage = err
        return EMPTY;
        })
      );*/
  }

}
