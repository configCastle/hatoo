import { Injectable } from "@angular/core";
import { DataService } from '../data-service/data.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IConfigFile } from '../sets-service/sets.service';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type excludedIdAndConfigType<T> = Omit<IConfigFile<T>, 'id'|'configType'>;

export type creatingFile<T> = excludedIdAndConfigType<T> & { configType: string };

@Injectable({ providedIn: 'root' })
export class FilesService {
  constructor(private _dataService: DataService) { }

  getFiles$(): Observable<IConfigFile<string>[]> {
    return this._dataService.getFiles$().pipe(
      take(1),
      map(e => e.data.files)
    );
  }

  getFileById$(id: number): Observable<IConfigFile<string>> {
    return this._dataService.getFileById$(id).pipe(
      take(1),
      map(e => e.data.file)
    );
  }

  createFile$(file: creatingFile<string>): Observable<IConfigFile<string>> {
    return this._dataService.createFile$(file).pipe(
      take(1),
      map(e => e.data.createFile)
    );
  }

}