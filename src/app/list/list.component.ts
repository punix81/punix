import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Customer, CustomerService } from '../shared';
import { Subscription } from 'rxjs';
import { DeleteComponent } from '../delete/delete.component';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { State as CustomersState, initialState } from '../reducers/customers';
import * as CustomersActions from '../actions/customers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  state: CustomersState = initialState;
  storeSubscription: Subscription;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('customers')
      .subscribe((value: CustomersState) => {
        this.state = value;
      });
    this.getCustomers();
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  getCustomers() {
    this.store.dispatch(
      new CustomersActions.RequestAction()
    );
    this.customerService.getAll();
  }

  search(searchObject: any) {
    this.store.dispatch(
      new CustomersActions.RequestAction()
    );
    this.customerService.search(
      searchObject.searchTerm,
      searchObject.sortProperty
    );
  }

  openDialog(customer: Customer) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '420px',
      data: customer
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.customerService
          .delete(customer.id)
          .subscribe(val => this.getCustomers());
      }
    });
  }

}
