import { Injectable } from '@angular/core';
import { testSets } from './test-sets';
import { DataService } from '../data-service/data.service';

export enum InputTypes {
  TEXT = 0,
  SELECT = 1
}

export interface IKeyValue<T> {
  id?: string;
  key?: T;
  value?: any;
  required?: boolean;
  type?: InputTypes;
  parent?: IKeyValue<T>;
}

export type IModel = IKeyValue<string> | IKeyValue<string>[];

export enum FileTypes {
  DOCKER_COMPOSE = 1,
  YAML = 2,
  JSON = 3,
  UNKNOWN = 4,
}

export interface IConfigFile<T> {
  id: number;
  name: string;
  configType: FileTypes;
  data: T;
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
  constructor(private _dataService: DataService) { }
  getById(id: number): ISet<IKeyValue<string>[]> | undefined {
    return testSets[0];
  }

  getServices() {
    return this._dataService.getServices$();
  }

  getServiceById$(id: number) {
    return this._dataService.getServiceById$(id);
  }

  getFiles$() {
    return this._dataService.getFiles$();
  }

  getFileById$(id: number) {
    return this._dataService.getFileById$(id);
  }

}
