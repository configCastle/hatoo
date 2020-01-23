import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { testSets } from './test-sets';
import { FormArray } from '@angular/forms';

export interface IConfigFile<T> {
  name: string;
  global: T;
  services: T[] | FormArray;
}

export interface ISet<T> {
  name: string;
  create: Date;
  update: Date;
  config_files: IConfigFile<T>[];
}

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  getById$(id: string): Observable<ISet<any>> {
    return of(testSets[0]);
  }
}
