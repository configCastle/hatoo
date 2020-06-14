import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FakeRESTDataService {

  logIn(login: string, password: string) {
    // if (this._binRandom()) {
    //   return throwError({message: 'Can not login!'});
    // }
    return of({data: {login: 'fldhgced', token: 'so8dyfoj9l7xsd'}});
  }
  
  signUp(login: string, password: string) {
    // if (this._binRandom()) {
    //   return throwError({message: 'Can not signup!'});
    // }
    return of({data: {login: 'fldhgced', token: 'so8dyfoj9l7xsd'}});
  }

  signOut() { }

  private _binRandom() {
    return Math.random() > 0.5;
  }

}