import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerDataService } from '../beer-data.service';
import { Beer } from '../beer.model';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.css']
})
export class BeerDetailComponent implements OnInit {
  public beer!: Beer;
  constructor(private route: ActivatedRoute, private _beerDataService: BeerDataService) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.beer = item['beer']);
  }

}
