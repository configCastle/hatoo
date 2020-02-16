import { Injectable } from '@angular/core';
import { SetsService, ISet, IConfigFile } from 'src/app/sets-service/sets.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private _selectedIndexSubject = new BehaviorSubject<number>(0);
  private _setSubject: BehaviorSubject<ISet<any> | undefined>;
  
  set$: Observable<ISet<any>>;
  index$: Observable<number>;
  selectedFile$: Observable<IConfigFile<any>>;

  constructor(
    _setsService: SetsService,
    _route: ActivatedRoute
  ) {
    const id = +_route.snapshot.params.id;
    const set = _setsService.getById$(id);
    this._setSubject = new BehaviorSubject(set);
    
    this.set$ = this._setSubject.asObservable();
    this.index$ = this._selectedIndexSubject.asObservable();
    this.selectedFile$ = combineLatest(
      this.index$,
      this.set$
    ).pipe(
      map(([i, set]) => set.config_files[i])
    )
  }

  updateFile(file: IConfigFile<any>): void {
    const newSet = this._setSubject.value;
    const index = newSet.config_files.findIndex(f => f.id === file.id);
    if (index > -1) {
      newSet.config_files[index] = file;
      this._setSubject.next(newSet);
    }
  }

  selectFileIndex(index: number): void {
    this._selectedIndexSubject.next(index);
  }
}
