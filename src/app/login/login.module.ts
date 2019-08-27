import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CallbackComponent } from './callback.component';

@NgModule({
  declarations: [LoginComponent, CallbackComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatButtonModule
  ]
})
export class LoginModule { }
