import { Injectable } from '@angular/core';
import { Review } from './review.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Beer } from './beer.model';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerDataService {
  private _beers: Beer[] = [];
  private _reloadBeers$ = new BehaviorSubject<boolean>(true);

  
  constructor(private http: HttpClient) { 
    this.beers$.subscribe((beers: Beer[]) => {
      this._beers = beers;
    });
  }

  get beers$(): Observable<Beer[]> {
    return this.http.get(`${environment.apiUrl}/beers/`).pipe(
      tap(console.log),
      catchError(this.handleError),
      map(
        (list: any[]): Beer[] => list.map(Beer.fromJSON))
    );
  }

  getBeer$(id: string): Observable<Beer> {
    return this.http
      .get(`${environment.apiUrl}/beers/${id}`)
      .pipe(tap(console.log),catchError(this.handleError), map(Beer.fromJSON)); 
  }

  addNewReview(beer: Beer, review: Review) {
    return this.http.post(`${environment.apiUrl}/beers/${beer.id}/reviews/`, review.toJSON())
    .pipe(tap(console.log), catchError(this.handleError), map(Review.fromJSON))
    .subscribe(() => {
      this._reloadBeers$.next(true);
    });
  }

  deleteReview(beer: Beer, review: Review) {
    return this.http
      .delete(`${environment.apiUrl}/beers/${beer.id}/reviews/${review.id}`)
      .pipe(tap(console.log), catchError(this.handleError))
      .subscribe(() => {
        this._reloadBeers$.next(true)
      });
  }
 
  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else if (err instanceof HttpErrorResponse) {
      console.log(err);
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = err;
    }
    return throwError(errorMessage);
  }

}
