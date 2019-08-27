import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store, StoreModule } from '@ngrx/store';

import { CustomerService } from './customer.service';
import { State as customerState } from '../reducers/customers';
import { reducers, State } from '../reducers';

describe('CustomerService', () => {
  const mockResponse = [
    {id: 0, name: 'Customer 1', country: 'Switzerland'},
    {id: 1, name: 'Customer 2', country: 'Switzerland'},
    {id: 2, name: 'Customer 3', country: 'Switzerland'}
  ];
  let injector: TestBed;
  let service: CustomerService;
  let httpMock: HttpTestingController;
  let store: Store<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        // need a configured provider for the store
        StoreModule.forRoot(reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
            strictStateSerializability: true,
            strictActionSerializability: true,
          },
        })
      ],
      providers: [
        CustomerService
      ]
    });
    injector = getTestBed();
    store = injector.get(Store);
    service = injector.get(CustomerService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return 3 customers', () => {
    let state: customerState;
    store.select('customers').subscribe((value: customerState) => state = value);
    service.getAll(); // trigger http.get, subscribe, dispatch success.
    const req = httpMock.expectOne(`http://localhost:3000/customers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    expect(state.loading).toBeFalsy();
    // check this assertion after dispatching the corresponding action
    expect(state.list.length).toBe(3);
  });

  it('should return test customers with matching names', () => {
    let state: customerState;
    store.select('customers').subscribe((value: customerState) => state = value);
    service.getAll();
    const req = httpMock.expectOne(`http://localhost:3000/customers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    expect(state.loading).toBeFalsy();
    expect(state.list[0].name).toEqual('Customer 1');
    expect(state.list[1].name).toEqual('Customer 2');
    expect(state.list[2].name).toEqual('Customer 3');
  });

});
