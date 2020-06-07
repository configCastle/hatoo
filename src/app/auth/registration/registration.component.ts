import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.scss']
})

export class RegistrationComponent {
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

  signUp() {
    const controls = this.form.controls;
    if (this.form.valid) {
      this._authService.signUp$(
        controls.login.value,
        controls.password.value
      ).subscribe(e => {
        if (e) {
          this.error = false;
          this._router.navigate(['/dashboard']);
        } else {
          this.error = { message: 'Registration error. Please try again.' }
        }
      })
    }
  }
}