import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UIModule } from '../ui.module';
import { AgreementComponent } from './registration/agreement/agreement.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    UIModule
  ],
  exports: [
    LoginComponent,
    RegistrationComponent
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AgreementComponent
  ],
  providers: [],
  entryComponents: [
    LoginComponent,
    RegistrationComponent,
    AgreementComponent
  ]
})
export class AuthModule { }
