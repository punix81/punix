import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput, Subscription } from 'rxjs';
import { Customer } from './customer.type';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import * as CustomersActions from '../actions/customers';


@Injectable({
  providedIn: 'root'
})
export class CustomerService implements OnDestroy {
  url = environment.api.URL + '/customers';
  getAllSubscription: Subscription;
  searchSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private store: Store<State>
  ) { }

  ngOnDestroy() {
    this.getAllSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  handleError(err: any): ObservableInput<any> {
    console.error(err);
    return [];
  }

  getAll() {
    this.getAllSubscription = this.http
      .get<Customer[]>(this.url)
      .subscribe(result => {
        this.store.dispatch(
          new CustomersActions.SuccessAction(result)
        );
      });
  }

  getById(id: number): Observable<Customer> {
    const getUrl = this.url + '/' + id + '?_embed=projects';
    return this.http.get<Customer>(getUrl)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  search(searchTerm: string, sortProperty = 'id') {
    const queryUrl = this.url + '?q='
      + encodeURIComponent(searchTerm)
      + '&_sort=' + encodeURIComponent(sortProperty)
      + '&_order=ASC';

    this.searchSubscription = this.http
      .get<Customer[]>(queryUrl)
      .subscribe(result => {
        this.store.dispatch(
          new CustomersActions.SuccessAction(result)
        );
      });
  }

  add(customer: Customer) {
    return this.http.post<Customer>(
      this.url,
      customer
    );
  }

  addProject(project) {
    const url = this.url.replace('/customers', '/projects');
    return this.http.post(
      url,
      project
    );
  }

  update(customer: Customer): Observable<Customer> {
    const putUrl = this.url + '/' + customer.id;
    return this.http
      .put<Customer>(putUrl, customer);
  }

  delete(id: number) {
    const deleteUrl = this.url + '/' + id;
    return this.http.delete<Customer>(deleteUrl);
  }
}
