import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",

   redirectTo:'pages/demos',
    pathMatch: "full"
  },
 
  {
    path: "pages",
    loadChildren: "./views/pages/pages.module#PagesModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
