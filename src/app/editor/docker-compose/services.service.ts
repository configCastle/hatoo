import { Injectable } from "@angular/core";
import { DataService } from 'src/app/data-service/data.service';
import { map } from 'rxjs/operators';
import { IKeyValue } from 'src/app/sets-service/sets.service';

export interface IDCService {
  id: number;
  name: string;
  data: IKeyValue<string>;
}

@Injectable({ providedIn: 'root' })
export class ServicesService {
  constructor(private _dataService: DataService) { }

  getServices$() {
    return this._dataService.getServices$().pipe(
      map(e => e.data.services)
    );
  }
  
  getServiceById$(id: number) {
    return this._dataService.getServiceById$(id).pipe(
      map(e => e.data.service)
    );
  }
}