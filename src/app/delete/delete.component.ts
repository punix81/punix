import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Customer } from '../shared';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) {}

  ngOnInit() {
  }

  close() {
    // Return false to cancel deletion
    this.dialogRef.close(false);
  }

  delete() {
    // Return true to delete customer
    this.dialogRef.close(true);
  }

}
