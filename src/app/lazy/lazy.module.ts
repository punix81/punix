import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {LazyComponent} from './lazy.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([{path: '', component: LazyComponent}])
	],
	declarations: [
		LazyComponent
	]
})
export class LazyModule {
}
