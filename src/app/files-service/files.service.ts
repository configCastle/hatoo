import { Injectable } from "@angular/core";
import { DataService, creatingFile, IUpdateFileData } from '../data-service/data.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IConfigFile } from '../sets-service/sets.service';

@Injectable({ providedIn: 'root' })
export class FilesService {
  constructor(private _dataService: DataService) { }

  getFiles$(): Observable<IConfigFile<string>[] | undefined> {
    return this._dataService.getFiles$().pipe(
      take(1),
      map(e => {
        if (e) { return e.data.files; }
      })
    );
  }

  getFileById$(id: number): Observable<IConfigFile<string> | undefined> {
    return this._dataService.getFileById$(id).pipe(
      take(1),
      map(e => {
        if (e) { return e.data.file; }
      })
    );
  }

  createFile$(file: creatingFile<string>): Observable<IConfigFile<string> | undefined> {
    return this._dataService.createFile$(file).pipe(
      take(1),
      map(e => {
        if (e) { return e.data.createFile; }
      })
    );
  }

  updateFile$(file: IUpdateFileData): Observable<IConfigFile<string> | undefined> {
    return this._dataService.updateFile$(file).pipe(
      take(1),
      map(e => {
        if (e) { return e.data.updateFile; }
      })
    )
  }
  
  removeFile$(id: number): Observable<IConfigFile<string> | undefined> {
    return this._dataService.deleteFile$(+id).pipe(
      take(1),
      map(e => {
        if (e) { return e.data.deleteFile; }
      })
    )
  }

}