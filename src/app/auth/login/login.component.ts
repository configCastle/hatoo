import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent {

  form: FormGroup;
  error: any;

  constructor(
    private _authService: AuthService,
    private _router: Router
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
        if (e) {
          this.error = false;
          this._router.navigate(['/dashboard']);
        } else {
          this.error = { message: 'Incorrect login or password.' }
        }
      })
    }
  }
}