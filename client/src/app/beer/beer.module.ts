import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerComponent } from './beer/beer.component';
import { ReviewComponent } from './review/review.component'
import { MaterialModule } from './../material/material.module';



@NgModule({
  declarations: [
    BeerComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    BeerComponent
  ]
})
export class BeerModule { }
