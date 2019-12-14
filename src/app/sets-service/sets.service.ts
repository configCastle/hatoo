import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { testSets } from './test-sets';

export interface IConfigFile {
  name: string;
  global: any;
  services: any[];
}

export interface ISet {
  name: string;
  create: Date;
  update: Date;
  config_files: IConfigFile[];
}

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  currentUserSets$: Observable<ISet[]> = of([]);
  getById$(): Observable<ISet> {
    return of(testSets[0]);
  }
  createSet$() { }
}
