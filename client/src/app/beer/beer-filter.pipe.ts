import { Pipe, PipeTransform } from '@angular/core';
import { Beer } from './beer.model';

@Pipe({
  name: 'beerFilter',
  pure: false
})
export class BeerFilterPipe implements PipeTransform {

  transform(beers: Beer[], name: string): Beer[] {
    if(!name || name.length === 0) {
      return beers;
    }
    return beers.filter(b => b.name.toLocaleLowerCase().startsWith(name.toLocaleLowerCase()));
  }

}
