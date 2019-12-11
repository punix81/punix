import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

import { Customer, CustomerService } from '../shared';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';

export interface CustomerProject {
  id: number;
  project: string;
  timestamp: Date;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input()
  customer: Customer;
  projectsForm: FormGroup;

  @ViewChild(MatTable, { static: false })
  table: MatTable<CustomerProject[]>;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  createForm() {
    this.projectsForm = this.formBuilder.group({
      projects: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    if (this.customer === undefined) {
      // use an additional operator (map) for demonstration,
      // separating the number cast from switchMap logic
      this.route.paramMap.pipe(
        map((params: ParamMap) => +params.get('id')),
        switchMap((id: number) => this.customerService.getById(id))
      ).subscribe(customer => this.customer = customer);
    }
  }

  get projects(): FormArray {
    return this.projectsForm.get('projects') as FormArray;
  }

  addField() {
    this.projects.push(
      this.formBuilder.group({
        description: ['', [Validators.required]],
        timestamp: [new Date(), [Validators.required]]
      })
    );
  }

  removeField(index) {
    this.projects.removeAt(index);
  }

  async onSubmit() {
    if (this.projectsForm.invalid) {
      return;
    }

    const projects = this.projects.value.map(p => {
      p.timestamp = new Date(p.timestamp).getTime();
      p.customerId = this.customer.id;
      return p;
    });

    for await (const project of projects) {
      this.customerService
        .addProject(project)
        .subscribe(result => {
          this.customer.projects.push(result);
          this.table.renderRows();
        });
    }

    this.createForm();
  }

}
