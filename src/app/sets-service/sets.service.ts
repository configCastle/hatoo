import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ISet {
  global: any;
  services: any[];
}

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  currentUserSets$: Observable<ISet[]> = of([]);
  getById$(): Observable<ISet> {
    return of()
  }
  createSet$() { }
}
