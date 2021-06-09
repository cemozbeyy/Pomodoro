import { MainPageComponent } from './main-page/main-page.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'first_page', pathMatch: 'full' },
  { path: 'first_page', component: FirstPageComponent },
  { path: 'main-page', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
