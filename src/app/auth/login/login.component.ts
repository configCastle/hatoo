import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, IAuthError } from '../auth.service';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent {

  private _errorSubject = new Subject<IAuthError | undefined>();
  
  form: FormGroup;
  error$ = this._errorSubject.asObservable();

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _borromSheet: MatBottomSheet
  ) {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  logIn() {
    const controls = this.form.controls;
    if (this.form.valid) {
      this._authService.logIn$(
        controls.login.value,
        controls.password.value
      ).subscribe(e => {
        if (e === true) {
          this._errorSubject.next(undefined);
          this._router.navigate(['/dashboard']);
          this._borromSheet.dismiss();
        } else {
          this._errorSubject.next(e);
        }
      })
    }
  }
}