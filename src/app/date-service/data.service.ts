import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';

@Injectable({ providedIn: 'root' })
export class DataService {
  private _base = 'http://10.61.4.134:8000/api/';
  constructor() { }

  getSet$(id: string) {
    return ajax({
      url: this._base + 'set/' + id,
      method: 'GET'
    })
  }
  
  getSets$() {
    return ajax({
      url: this._base + 'set',
      method: 'GET'
    })
  }
  
  getComponent$(id: string) {
    return ajax({
      url: this._base + 'component/' + id,
      method: 'GET'
    })
  }

  getComponents$() {
    return ajax({
      url: this._base + 'component',
      method: 'GET'
    })
  }

}
