import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  template: `
<form novalidate fxFlex="500px" fxLayout="row" fxLayoutAlign="space-around" (ngSubmit)="onSubmit()" [formGroup]="searchForm">
  <mat-form-field>
    <input matInput formControlName="searchTerm" placeholder="{{'Search' | translate}}">
  </mat-form-field>
  <mat-form-field>
    <mat-select formControlName="sortProperty" placeholder="{{'Sort by' | translate}}">
      <mat-option *ngFor="let o of sortOptions" [value]="o">
        {{ o | uppercase }}
      </mat-option>
    </mat-select>
  </mat-form-field>
</form>
  `,
  styles: [`form { margin: auto; }`]
})
export class SearchComponent implements OnInit {
  @Output()
  searchCustomer: EventEmitter<any> = new EventEmitter();
  searchForm: FormGroup;
  sortOptions: string[] = [
    'id',
    'name',
    'country'
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
      sortProperty: ['id'],
    });

    this.searchForm.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.onSubmit();
    });
  }

  onSubmit() {
    this.searchCustomer.emit({
      searchTerm: this.searchForm.value.searchTerm,
      sortProperty: this.searchForm.value.sortProperty
    });
  }

}
