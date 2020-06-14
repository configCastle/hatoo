import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from './config';

@Injectable({ providedIn: 'root' })
export class RESTDataService {

  constructor(
    private _http: HttpClient
  ) { }

  logIn$(login: string, password: string) {
    return this._http.post(
      `${baseURL}auth`,
      { login, password }
    )
  }

  signUp$(login: string, password: string) {
    return this._http.post(
      `${baseURL}signup`,
      { login, password }
    )
  }

  refresh$(refreshToken: string) {
    console.log('refresh');
    return this._http.post(
      `${baseURL}refresh-token`,
      { token: refreshToken }
    )
  }

}