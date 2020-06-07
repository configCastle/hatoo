import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { RESTDataService } from '../rest-data-service/rest-data.service';

export interface IUser {
  id: string;
  login: string;
  token: string;
}

//
// TODO Normal signUp & logIn result from methods (not just boolean);
//

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _user: IUser;
  get user() {
    return { ...this._user }
  }
  isLoggedIn = false;
  lsKey = 'auth-storage-key';

  constructor(
    private _restData: RESTDataService,
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) {
    const userFromLS = _localStorageService.get(this.lsKey)
    if (userFromLS) {
      this.isLoggedIn = true;
      this._user = JSON.parse(userFromLS);
    }
  }

  logIn$(
    login: string,
    password: string
  ): Observable<boolean> {
    return this._restData.logIn(login, password)
    .pipe(
      catchError(err => {
        console.error(err);
        return of(undefined);
      }),
      map(res => {
        if (!res) { return false; }
        const token = res.headers.get('authorization');
        if (!token) { return false; }
        this._user = {
          id: res.body.key,
          login: res.body.login,
          token
        }
        this._localStorageService.set(this.lsKey, JSON.stringify(this._user))
        this.isLoggedIn = res.ok;
        return res.ok;
      })
    )
  }

  signUp$(
    login: string,
    password: string
  ) {
    return this._restData.signUp(login, password)
    .pipe(
      catchError(err => {
        console.error(err);
        return of(undefined);
      }),
      map(res => {
        if (!res) { return false; }
        const token = res.headers.get('authorization');
        if (!token) { return false; }
        this._user = {
          id: res.body.key,
          login: res.body.login,
          token
        }
        this._localStorageService.set('instr-user', JSON.stringify(this._user))
        this.isLoggedIn = res.ok;
        return res.ok;
      })
    )
  }

  signOut() {
    // 
    // sign out request
    // 
    this._user = undefined;
    this.isLoggedIn = false;
    this._localStorageService.set('instr-user', '');
    this._router.navigate(['/login']);
  }

}