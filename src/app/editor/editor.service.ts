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
        pointer[index] = { ...pointer[index], ...changes.data };

        break;
      case ChangeType.ADD:
        const element = pointer.find(e => e.id === changes.id);
        if (element) { pointer = element.value; }
        
        const newId = `${changes.id}_${pointer}`;
        this._modelParser.index(changes.data, newId)
        const newElement: IKeyValue<string> = changes.data;
        pointer.push(newElement);

        break;
      case ChangeType.REMOVE:
        console.log(changes);
        console.log(pointer);
        const removeIndex = pointer.findIndex(e => e.id === changes.id);
        pointer.splice(removeIndex, 1);
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
