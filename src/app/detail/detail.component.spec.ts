import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DetailComponent } from './detail.component';
import { Customer, CustomerService } from '../shared';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * Unit-test this component by mocking input-data (customer), CustomerService,
 * ActivatedRoute and the sub-component NavComponent
 *
 * Imports Material-UI & FlexLayout modules
 */
describe('DetailComponent', () => {

  @Component({
    selector: 'app-nav',
    template: ``
  })
  class NavStubComponent {}

  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  const customerStub: Customer = {
    id: 1,
    name: 'Test Customer',
    country: 'Switzerland',
    projects: [
      {
        id: 1,
        customerId: 1,
        timestamp: 1439035407488,
        description: 'Test Project'
      }
    ]
  };

  const customerServiceStub = {
    getById(id: number): Observable<Customer> {
      return of(customerStub);
    }
  };

  const activatedRouteStub = {
    paramMap: of({
        get: (field: string) => {
          if (field === 'id') {
            return customerStub.id;
          }
        }
      })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FlexLayoutModule
      ],
      declarations: [
        DetailComponent,
        NavStubComponent
      ],
      providers: [
        {
          provide: CustomerService,
          useValue: customerServiceStub
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the country in uppercase', () => {
    const country = fixture.nativeElement
      .querySelector('p').innerText;
    expect(country).toEqual('SWITZERLAND');
  });

});
