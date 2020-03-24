import { Injectable } from '@angular/core';
import { SetsService, ISet, IConfigFile, IKeyValue } from 'src/app/sets-service/sets.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { IChangeList } from './docker-compose/graphic-editor/editor-form/editor-form.component';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private _selectedIndexSubject = new BehaviorSubject<number>(0);
  private _setSubject: BehaviorSubject<ISet<any> | undefined>;

  set$: Observable<ISet<any>>;
  index$: Observable<number>;
  file$: Observable<IConfigFile<any>>;

  constructor(
    _setsService: SetsService,
    _route: ActivatedRoute
  ) {
    const id = +_route.snapshot.params.id;
    const set = _setsService.getById(id);
    this._setSubject = new BehaviorSubject(set);

    this.set$ = this._setSubject.asObservable();
    this.index$ = this._selectedIndexSubject.asObservable();
    this.file$ = combineLatest(
      this.index$,
      this.set$
    ).pipe(map(([i, s]) => s.config_files[i]));
  }

  changeFileData(id: number, changes: IChangeList) {
    const set = this._setSubject.value;
    const index = set.config_files.findIndex(f => f.id === id);
    if (index > -1) {
      const data = set.config_files[index].data;
      this._makeChange(changes, data);
      this._setSubject.next(set);
    }
  }

  private _makeChange(changes: IChangeList, data: IKeyValue<string>) {
    while (
      changes.subtree != null &&
      Array.isArray(data)
    ) {
      data = data.find(e => e._id === changes.id).value;
      changes = changes.subtree;
    }
    if (changes.change.value) {
      data.find(e => e._id === changes.id).value = changes.change.value;
    } else {
      data.find(e => e._id === changes.id).key = changes.change.key;
    }
  }

  updateFile(file: IConfigFile<any>): void {
    const set = this._setSubject.value;
    const index = set.config_files.findIndex(f => f.id === file.id);
    if (index > -1) {
      set.config_files[index] = file;
      this._setSubject.next(set);
    }
  }

  selectFileIndex(index: number): void {
    this._selectedIndexSubject.next(index);
  }
}
