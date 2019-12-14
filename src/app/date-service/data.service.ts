import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor() {
    // ajax({
    //   url: 'http://10.61.4.134:8000/api/set/1/',
    //   method: 'GET'
    // }).subscribe(console.log);
  }
}
