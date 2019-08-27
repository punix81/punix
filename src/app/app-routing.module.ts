import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ErrorComponent } from './error/error.component';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from './shared';

const routes: Routes = [
  { path: 'customer/edit/:id', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'customer/add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'customer/:id', component: DetailComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: ListComponent, canActivate: [AuthGuard] },
  { path: '', component: ListComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
