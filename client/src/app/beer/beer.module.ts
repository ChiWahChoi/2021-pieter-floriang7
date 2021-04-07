import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerComponent } from './beer/beer.component';
import { ReviewComponent } from './review/review.component'
import { MaterialModule } from './../material/material.module';
import { BeerListComponent } from './beer-list/beer-list.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { HttpClientModule } from '@angular/common/http';
import { BeerFilterPipe } from './beer-filter.pipe';



@NgModule({
  declarations: [
    BeerComponent,
    ReviewComponent,
    BeerListComponent,
    AddReviewComponent,
    BeerFilterPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    BeerListComponent
  ]
})
export class BeerModule { }
