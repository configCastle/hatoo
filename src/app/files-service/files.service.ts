import { Injectable } from "@angular/core";
import { DataService, creatingFile, IUpdateFileData } from '../data-service/data.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IConfigFile } from '../sets-service/sets.service';

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

  updateFile$(file: IUpdateFileData): Observable<IConfigFile<string>> {
    return this._dataService.updateFile$(file).pipe(
      take(1),
      map(e => e.data.updateFile)
    )
  }
  
  removeFile$(id: number): Observable<IConfigFile<string>> {
    return this._dataService.deleteFile$(+id).pipe(
      take(1),
      map(e => e.data.deleteFile)
    )
  }

}