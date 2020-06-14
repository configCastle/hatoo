import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MainPageGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  canActivate(): Observable<boolean> {
    return this._authService.isLoggedIn$.pipe(
      tap(e => {
        if (e) { this._router.navigate(['/dashboard']); }
      }),
      map(e => !e)
    )
  }
  
}