import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { RESTDataService } from '../rest-data-service/rest-data.service';

export interface IUser {
  id: number;
  login: string;
  accessToken: string;
  expiresIn: number;
}

export interface IAuthError {
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _user: IUser;
  get user() { return { ...this._user } }

  private _isLoggedIn = false;
  get isLoggedIn() { return this._isLoggedIn; }

  readonly lsKey = 'auth-storage-key';

  constructor(
    private _restData: RESTDataService,
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) {
    this._refresh$().subscribe();
  }

  logIn$(
    login: string,
    password: string
  ): Observable<true | IAuthError> {
    return this._restData.logIn$(login, password)
      .pipe(
        catchError(err => {
          console.error(err);
          return of(err);
        }),
        map(res => {
          if (res.error) {

            // TODO: Process the different errors

            return { message: "При входе в систему возникла ошибка. Попробуйте ещё раз." };
          }
          this._processResponse(res);
          return true;
        })
      )
  }

  signUp$(
    login: string,
    password: string
  ): Observable<true | IAuthError> {
    return this._restData.signUp$(login, password)
      .pipe(
        catchError(err => {
          console.error(err);
          return of(err);
        }),
        map(res => {
          console.log(res);
          if (res.error) {
            if (res.error.error === "User already exist") {
              return { message: "Этот логин занят другим пользователем." };
            }
            if (res.error.error === "Password is to short") {
              return { message: "Пароль должен содержать не менее 8-ми символов." };
            }
            return { message: "При оформлении подписки возникла ошибка. Попробуйте ещё раз." };
          }
          this._processResponse(res);
          return true;
        })
      )
  }

  signOut() {
    this._user = undefined;
    this._isLoggedIn = false;
    this._localStorageService.remove(this.lsKey);
    this._router.navigate(['/']);
  }

  checkAuth$(): Observable<boolean> {
    if (this._checkExirationTS(this._user.expiresIn)) {
      return of(true);
    } else {
      return this._refresh$()
        .pipe(
          map(e => {
            if (e.error) {
              this.signOut();
              return false
            }
            return true;
          })
        )
    }
  }

  private _refresh$() {
    const userFromLS = this._localStorageService.get(this.lsKey)
    if (userFromLS) {
      const parsedUser = JSON.parse(userFromLS);
      if (parsedUser.refreshToken) {
        return this._restData.refresh$(parsedUser.refreshToken)
          .pipe(
            catchError(err => {
              console.error(err);
              return of(err);
            }),
            tap(e => {
              if (!e.error) { this._processResponse(e); }
            })
          )
      } else {
        return of({ error: 'No refresh token has been stored' });
      }
    } else {
      return of({ error: 'No refresh token has been stored' });
    }
  }

  private _checkExirationTS(ts: number): boolean {
    const currentDate = new Date().getTime();
    const normalizedExpTS = ts * 1000;
    console.log('current: ', currentDate);
    console.log('expiration: ', normalizedExpTS);
    return normalizedExpTS > currentDate;
  }

  private _processResponse(res) {
    this._user = {
      id: res.id,
      login: res.login,
      accessToken: res.accessToken,
      expiresIn: res.expires_in
    }
    this._isLoggedIn = true;
    const userToStore = {
      id: res.id,
      login: res.login,
      refreshToken: res.refreshToken
    }
    this._localStorageService.set(this.lsKey, JSON.stringify(userToStore))
  }

}