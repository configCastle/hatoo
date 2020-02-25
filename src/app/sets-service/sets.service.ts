import { Injectable } from '@angular/core';
import { testSets } from './test-sets';

export interface IConfigFile<T> {
  id: number;
  name: string;
  global: T;
  services: T | T[];
}

export interface ISet<T> {
  id: number;
  name: string;
  create: Date;
  update: Date;
  config_files: IConfigFile<T>[];
}

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  getById(id: number): ISet<any> | undefined {
    return testSets[0];
  }
}
