import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerComponent } from './beer/beer.component';
import { ReviewComponent } from './review/review.component'
import { MaterialModule } from './../material/material.module';
import { BeerListComponent } from './beer-list/beer-list.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { HttpClientModule } from '@angular/common/http';
import { BeerFilterPipe } from './beer-filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BeerResolver } from './BeerResolver';
import { AuthGuard } from '../user/auth.guard';
import { TopRatedComponent } from './top-rated/top-rated.component';

const routes: Routes = [
  { path: 'beer/list', canActivate: [AuthGuard], component: BeerListComponent },
  { path: 'beer/list/detail/:id', canActivate: [AuthGuard], component: BeerDetailComponent, resolve: {beer: BeerResolver}},
  { path: 'beer/top-rated', canActivate: [AuthGuard], component: TopRatedComponent },
  { path: 'beer/top-rated/detail/:id', canActivate: [AuthGuard], component: BeerDetailComponent, resolve: {beer: BeerResolver}}
];

@NgModule({
  declarations: [
    BeerComponent,
    ReviewComponent,
    BeerListComponent,
    AddReviewComponent,
    BeerFilterPipe,
    BeerDetailComponent,
    TopRatedComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    BeerListComponent,
    AddReviewComponent
  ]
})
export class BeerModule { }
