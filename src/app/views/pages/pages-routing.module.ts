
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Version1Component } from './comingsoon/version1/version1.component';
import { DemoComponent } from './comingsoon/demo/demo.component';

const routes: Routes = [
  {
    path: "demos",
    component: DemoComponent
  },
  {
    path: "comingsoon/version1",
    component: Version1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
