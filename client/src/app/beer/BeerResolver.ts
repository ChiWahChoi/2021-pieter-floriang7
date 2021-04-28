import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { BeerDataService } from "./beer-data.service";
import { Beer } from "./beer.model";

@Injectable({
    providedIn: 'root'
})

export class BeerResolver implements Resolve<Beer> {
    constructor(private _beerDataService: BeerDataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Beer> {
        return this._beerDataService.getBeer$(route.params['id']);
    }
}