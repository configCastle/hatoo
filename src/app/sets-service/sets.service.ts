import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  currentUserSets$: Observable<any[]> = of([]);
  getById$(): Observable<> {}
  createSet$() { }
}
