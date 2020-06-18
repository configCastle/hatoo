import { Component } from '@angular/core';
import { AuthService, IAuthError } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { AgreementComponent } from './agreement/agreement.component';

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.scss']
})

export class RegistrationComponent {
  private _errorSubject = new Subject<IAuthError | undefined>();
  
  form: FormGroup;
  error$ = this._errorSubject.asObservable();
  agree = false;
  
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _borromSheet: MatBottomSheet,
    private _dialog: MatDialog
  ) {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  openAgreement() {
    this._dialog.open(AgreementComponent);
  }

  signUp() {
    if (!this.agree) { return; }
    const controls = this.form.controls;
    if (this.form.valid) {
      this._authService.signUp$(
        controls.login.value,
        controls.password.value
      ).subscribe(e => {
        if (e === true) {
          this._errorSubject.next(undefined);
          this._router.navigate(['/dashboard']);
          console.log('Navigated to dashboard');
          
          this._borromSheet.dismiss();
        } else {
          this._errorSubject.next(e);
        }
      })
    }
  }
}