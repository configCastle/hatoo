import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { LoginComponent } from '../auth/login/login.component';
import { RegistrationComponent } from '../auth/registration/registration.component';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})

export class MainComponent {
  constructor(
    private _bottomSheet: MatBottomSheet
  ) { }

  openLogInForm() {
    this._bottomSheet.open(LoginComponent)
      .afterDismissed()
      .subscribe(e => {
        if (e == null) { return; }
        console.log(e);
        
      })
  }

  openSignUpForm() {
    this._bottomSheet.open(RegistrationComponent)
      .afterDismissed()
      .subscribe(e => {
        if (e == null) { return; }
        console.log(e);
        
      })
  }
}