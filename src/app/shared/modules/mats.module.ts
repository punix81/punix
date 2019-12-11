import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule
} from '@angular/material';

const matModules = [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    MatMenuModule
]

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    exports: matModules
})
export class MatsModule {
}
