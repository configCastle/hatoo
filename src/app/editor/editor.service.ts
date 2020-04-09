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

  changeFileData(changes: IChangeList, id?: number) {
    const fileId = id || this._selectedIndexSubject.value;
    const set = this._setSubject.value;
    const file = set.config_files.find(f => f.id === fileId);
    if (file) {
      this._makeChange(changes, file.data);
      this._setSubject.next(set);
    }
  }

  private _findNode(data: IKeyValue<string>[], id: string): IKeyValue<string> | undefined {
    const devider = '_';
    const indexesList = id.split(devider).slice(1);
    let currentIndex = '';
    let currentNode: IKeyValue<string> = { value: data };

    indexesList.some(e => {
      currentIndex = `${currentIndex}${devider}${e}`;
      currentNode = currentNode.value.find(e => e.id === currentIndex);
      if (!currentNode || !Array.isArray(currentNode.value)) { return true; }
    })

    return currentNode;
  }

  private _makeChange(changes: IChangeList, data: IKeyValue<string>[]) {
    const targetElement = this._findNode(data, changes.id);
    const parentElement = targetElement.parent;
    if (parentElement) {
      const index = parentElement.value.findIndex(e => e === targetElement);

      switch (changes.type) {
        case ChangeType.UPDATE:
          parentElement.value[index] = { ...parentElement.value[index], ...changes.data };
          break;

        case ChangeType.ADD:
          if (!changes.data) {
            const newElement: IKeyValue<string> = { }
            if (targetElement.key) { newElement.key = 'key' }
            if (targetElement.value) { newElement.value = 'value' }
            parentElement.value.splice(index + 1, 0, newElement)
            this._modelParser.index(parentElement, parentElement.id, parentElement.parent)
          } else {
            // TODO: here must be appended custom additional element  
            console.log(changes.data);
          }
          break;

        case ChangeType.CHANGE_STRUCT:
          targetElement.key = undefined;
          targetElement.value = undefined;
          parentElement.value[index] = this._filterObject({
            ...targetElement,
            ...changes.data
          });
          this._modelParser.index(parentElement, parentElement.id, parentElement.parent)
          break;

        case ChangeType.REMOVE:
          parentElement.value.splice(index, 1);
          if (!parentElement.value.length) {
            parentElement.value = 'value'
          }
          break;
      }
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
