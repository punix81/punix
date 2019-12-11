import {AfterViewInit, Component} from '@angular/core';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
	navigation = [
		{url: 'home', label: 'i18n.routes.home.title'},
		{url: 'lazy', label: 'i18n.routes.lazy.title'}
	];

	constructor() {
	}

	ngAfterViewInit() {

	}
}
