import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
	{path: 'home', component: HomeComponent},
	{path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)},
	{path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {
}
