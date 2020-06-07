import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { UIModule } from '../ui.module';

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
    RegistrationComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  entryComponents: [
    LoginComponent,
    RegistrationComponent
  ]
})
export class AuthModule { }
