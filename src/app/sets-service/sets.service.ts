import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { testSets } from './test-sets';

export interface IConfigFile<T> {
  name: string;
  global: T;
  services: T[];
}

export interface ISet {
  name: string;
  create: Date;
  update: Date;
  config_files: IConfigFile<any>[];
}

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  getById$(id: string): Observable<ISet> {
    return of(testSets[0]);
  }
}
