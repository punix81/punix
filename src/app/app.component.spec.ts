import {async, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateService} from '@ngx-translate/core';
import {MockTranslatePipe} from 'tests';
import {AppComponent} from './app.component';

describe('AppComponent', () => {

	let app: AppComponent;

	const mockNotificationService = {
		success: jest.fn(),
	};

	beforeEach(async(() => {
		mockNotificationService.success.mockReturnValue('This is a test');

		const mockTranslateService = {
			setDefaultLang: jest.fn(),
			use: jest.fn(),
			success: jest.fn(),
			info: jest.fn()
		};

		TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				MockTranslatePipe
			],
			imports: [
				RouterTestingModule
			],
			schemas: [
				CUSTOM_ELEMENTS_SCHEMA
			],
			providers: [
				{ useValue: mockNotificationService},
				{provide: TranslateService, useValue: mockTranslateService}

			]
		});
		TestBed.compileComponents();
		const fixture = TestBed.createComponent(AppComponent);
		app = fixture.debugElement.componentInstance;
	}));

	it('should create the app', () => {
		expect(app).toBeTruthy();
	});

	it('should test success', () => {
		app.ngAfterViewInit();
		expect(mockNotificationService.success).toHaveBeenCalled();
	});
});
