import { Injectable } from '@angular/core';
import { SetsService, ISet, IConfigFile, IKeyValue } from 'src/app/sets-service/sets.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { IChangeList, ChangeType } from './docker-compose/graphic-editor/editor-form/editor-form.component';

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

  private _makeChange(changes: IChangeList, data: IKeyValue<string>[]) {
    let pointer = data;
    while (
      changes.subtree != null &&
      Array.isArray(pointer)
    ) {
      pointer = pointer.find(e => e.id === changes.id).value;
      changes = changes.subtree as IChangeList;
    }
    switch (changes.type) {
      case ChangeType.UPDATE:
        const index = pointer.findIndex(e => e.id === changes.id);
        pointer[index] = { ...pointer[index], ...changes.newValues };

        break;
      case ChangeType.ADD:
        pointer = pointer.find(e => e.id === changes.id).value;
        const newElement = { ...pointer[0] };
        const newId = `${changes.id}_${pointer}`;
        if (newElement.key) { newElement.key = ''; }
        if (newElement.value) { newElement.value = ''; }
        newElement.id = newId;
        pointer.push(newElement);

        break;
      case ChangeType.REMOVE:
        break;
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
