import { Injectable } from '@angular/core';
import { Observable, of, Subject, ReplaySubject } from 'rxjs';
import { map, catchError, tap, take } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { RESTDataService } from '../rest-data-service/rest-data.service';

const HTTP_UNAUTHORIZED = 401;
const HTTP_BAD_REQUEST = 400;

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
  private _loggedInSubject = new ReplaySubject<boolean>();

  private _user: IUser;
  get user() { return { ...this._user } }

  isLoggedIn$ = this._loggedInSubject.asObservable();

  readonly lsKey = 'auth-storage-key';

  constructor(
    private _restData: RESTDataService,
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) {
    this._refresh$().subscribe(e => {
      if (e.error) {
        this.signOut();
      }
    });
  }

  logIn$(
    login: string,
    password: string
  ): Observable<true | IAuthError> {
    return this._restData.logIn$(login, password)
      .pipe(
        catchError(err => {
          return of(err);
        }),
        map(res => {
          if (!res.ok) {
            if (res.status === HTTP_UNAUTHORIZED) {
              return { message: "Неверный логин или пароль." };
            }
            return { message: "При входе в систему возникла ошибка. Попробуйте ещё раз." };
          }
          this._processResponse(res.body);
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
          return of(err);
        }),
        map(res => {
          if (!res.ok) {
            if (res.status === HTTP_UNAUTHORIZED) {
              return { message: "Этот логин занят другим пользователем." };
            }
            if (res.status === HTTP_BAD_REQUEST) {
              return { message: "Пароль должен содержать не менее 8-ми символов." };
            }
            return { message: "При оформлении подписки возникла ошибка. Попробуйте ещё раз." };
          }
          this._processResponse(res.body);
          return true;
        })
      )
  }

  signOut() {
    this._user = undefined;
    this._localStorageService.remove(this.lsKey);
    this.isLoggedIn$
      .pipe(take(1))
      .subscribe(e => {
        if (!e) {
          console.log(e);
          this._router.navigate(['/']);
        }
      })
    this._loggedInSubject.next(false);
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
    const userFromLS = this._localStorageService.get(this.lsKey);
    if (userFromLS) {
      const parsedUser = JSON.parse(userFromLS);
      if (parsedUser.refreshToken) {
        return this._restData.refresh$(parsedUser.refreshToken)
          .pipe(
            catchError(err => {
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
    return normalizedExpTS > currentDate;
  }

  private _processResponse(res) {
    this._user = {
      id: res.id,
      login: res.login,
      accessToken: res.accessToken,
      expiresIn: res.expires_in
    }
    const userToStore = {
      id: res.id,
      login: res.login,
      refreshToken: res.refreshToken
    }
    this._localStorageService.set(this.lsKey, JSON.stringify(userToStore))
    this._loggedInSubject.next(true);
  }

}