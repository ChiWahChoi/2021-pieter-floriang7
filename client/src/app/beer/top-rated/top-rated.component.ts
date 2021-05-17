import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BeerDataService } from '../beer-data.service';
import { Beer } from '../beer.model';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {
  private _beers: Beer[] = [];
  private _fetchBeers$!: Observable<Beer[]>;
  public errorMessage: string = "";

  constructor(private _beerDataService: BeerDataService) { 
    this._beerDataService.getTopRated$().subscribe(
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
    this. _fetchBeers$ = this._beerDataService.getTopRated$().pipe(
      catchError(err => {
        this.errorMessage = err
        return EMPTY;
        })
      );
  }

}
