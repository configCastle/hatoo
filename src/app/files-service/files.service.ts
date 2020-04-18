import { Injectable } from "@angular/core";
import { DataService } from '../data-service/data.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FilesService {
  constructor(private _dataService: DataService) { }

  getFiles$() {
    return this._dataService.getFiles$().pipe(
      map(e => e.data.files)
    );
  }

  getFileById$(id: number) {
    return this._dataService.getFileById$(id).pipe(
      map(e => e.data.file)
    );
  }

}