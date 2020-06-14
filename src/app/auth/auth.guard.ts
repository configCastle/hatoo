import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  isLoggedIn = false;

  constructor(
    private _router: Router,
    _authService: AuthService
  ) {
    _authService.isLoggedIn$.subscribe(e => this.isLoggedIn = e);
  }

  canActivate(): boolean {
    if (!this.isLoggedIn) {
      this._router.navigate(['/']);
    }
    return this.isLoggedIn;
  }
  
}