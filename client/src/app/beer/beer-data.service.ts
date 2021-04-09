import { Injectable } from '@angular/core';
import { Review } from './review.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Beer } from './beer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerDataService {

  
  constructor(private http: HttpClient) { }

  get beers$(): Observable<Beer[]> {
    return this.http.get(`${environment.apiUrl}/beers/`).pipe(
      tap(console.log),
      map(
        (list: any[]): Beer[] => list.map(Beer.fromJSON))
    );
  }

  getBeers$(id: string): Observable<Beer[]> {
      return this.http.get(`${environment.apiUrl}/beers/${id}`).pipe
      (tap(console.log), 
      map((list: any[]): Beer[] => list.map(Beer.fromJSON))
      );
  }


}
