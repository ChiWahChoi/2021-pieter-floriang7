import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BeerListComponent } from './beer/beer-list/beer-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BeerDetailComponent } from './beer/beer-detail/beer-detail.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const appRoutes: Routes = [
  /*{ path: 'beer', loadChildren: () => import('./beer/beer.module').then(mod => mod.BeerModule)},*/
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'beer/list', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
