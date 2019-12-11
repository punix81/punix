import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CustomerService, Customer } from '../shared';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  customer: Customer = { id: 0, name: '', country: '' };

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap(
      (params: ParamMap) => {
        if (+params.get('id')) {
          return this.customerService.getById(+params.get('id'));
        } else {
          return of({ id: 0, name: '', country: '' });
        }
      }
    )).subscribe(customer => this.customer = customer);
  }

  onSubmit() {
    let save: Observable<Customer>;
    if (this.customer.id) {
      save = this.customerService.update(this.customer);
    } else {
      save = this.customerService.add(this.customer);
    }
    save.subscribe(
      addedCustomer => this.router.navigate(['/customers'])
    );
  }
}
