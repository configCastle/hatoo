import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MainPageGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  canActivate(): boolean {
    if (this._authService.isLoggedIn) {
      this._router.navigate(['/dashboard'])
    }
    return !this._authService.isLoggedIn;
  }
  
}