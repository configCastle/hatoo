import { Injectable } from '@angular/core';
import { SetsService, ISet, IConfigFile, IKeyValue } from 'src/app/sets-service/sets.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { IChangeList, ChangeType } from './docker-compose/graphic-editor/editor-form/editor-form.component';
import { ModelParserService } from '../Parser/ModelParser/model-parser.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private _selectedIndexSubject = new BehaviorSubject<number>(0);
  private _setSubject: BehaviorSubject<ISet<IKeyValue<string>[]> | undefined>;

  set$: Observable<ISet<IKeyValue<string>[]>>;
  index$: Observable<number>;
  file$: Observable<IConfigFile<IKeyValue<string>[]>>;

  constructor(
    _setsService: SetsService,
    _route: ActivatedRoute,
    private _modelParser: ModelParserService
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
      this._makeChange(changes, set.config_files[index].data);
      this._setSubject.next(set);
    }
  }

  private _makeChange(changes: IChangeList, data: IKeyValue<string>[]) {
    let pointer = data;
    let index: number;
    if (changes.id) {
      while (changes.subtree && Array.isArray(pointer)) {
        pointer = pointer.find(e => e.id === changes.id).value;
        changes = changes.subtree as IChangeList;
      }
      index = pointer.findIndex(e => e.id === changes.id);
    }

    switch (changes.type) {
      case ChangeType.UPDATE:
        pointer[index] = { ...pointer[index], ...changes.data };
        break;

      case ChangeType.ADD:
        if (!changes.data) {
          console.log(pointer);
          
        }
        break;

      case ChangeType.CHANGE_STRUCT:
        pointer[index].key = undefined;
        pointer[index].value = undefined;
        pointer[index] = this._filterObject({
          ...pointer[index],
          ...changes.data
        });
        break;

      case ChangeType.REMOVE:
        pointer.splice(index, 1);
        if (!pointer.length) { /**/ }
        break;
    }
  }

  private _filterObject(obj: any): any {
    const filtred = {};
    for (const field in obj) {
      if (obj.hasOwnProperty(field) && obj[field] != null) {
        filtred[field] = obj[field]
      }
    }
    return filtred;
  }

  updateFile(file: IConfigFile<IKeyValue<string>[]>): void {
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
