import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ListComponent } from './list.component';
import { CustomerService } from '../shared';
import { State } from '../reducers';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: MockStore<State>;

  const testCustomers: Array<any> = [
    {id: 1, name: 'First Customer', country: 'Switzerland'},
    {id: 2, name: 'Second Customer', country: 'Switzerland'},
    {id: 3, name: 'Third Customer', country: 'Switzerland'}
  ];

  const customerServiceStub = {
    getAll() {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [ ListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: CustomerService,
          useValue: customerServiceStub
        },
        MatDialog,
        provideMockStore()
      ],
    })
    .compileComponents();

    store = TestBed.get(Store);
    store.setState({customers: { loading: false, list: testCustomers }});
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show three spans with customers', () => {

    const customerListElements = fixture.debugElement
      .queryAll(By.css('mat-card>mat-card-header'));
    expect(customerListElements.length).toBe(3);
  });

  it('should contain "First Customer"', () => {
    const featureListElement = fixture.debugElement
      .query(By.css('mat-card-title:first-of-type'))
      .nativeElement;
    expect(featureListElement.textContent)
      .toContain('First Customer');
  });
});
