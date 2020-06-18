import { Injectable } from "@angular/core";
import { DataService } from 'src/app/data-service/data.service';
import { map } from 'rxjs/operators';
import { IKeyValue } from 'src/app/sets-service/sets.service';
import { Observable } from 'rxjs';

export interface IDCService {
  id: number;
  name: string;
  data: IKeyValue<string>;
}

@Injectable({ providedIn: 'root' })
export class ServicesService {
  constructor(private _dataService: DataService) { }

  getServices$(): Observable<IDCService[] | undefined> {
    return this._dataService.getServices$().pipe(
      map(e => {
        if (e.data) {
          return e.data.services;
        }
      })
    );
  }
  
  getServiceById$(id: number): Observable<IDCService | undefined> {
    return this._dataService.getServiceById$(id).pipe(
      map(e => {
        if (e.data) {
          return e.data.service;
        }
      })
    );
  }
}