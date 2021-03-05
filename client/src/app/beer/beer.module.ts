import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerComponent } from './beer/beer.component';
import { ReviewComponent } from './review/review.component'
import { MaterialModule } from './../material/material.module';
import { BeerListComponent } from './beer-list/beer-list.component';



@NgModule({
  declarations: [
    BeerComponent,
    ReviewComponent,
    BeerListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    BeerListComponent
  ]
})
export class BeerModule { }
