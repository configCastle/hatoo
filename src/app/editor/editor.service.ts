import { Injectable } from '@angular/core';
import { SetsService, ISet, IConfigFile, IKeyValue, FileTypes } from 'src/app/sets-service/sets.service';
import { Observable, BehaviorSubject, combineLatest, of, ReplaySubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, tap, switchMap, mapTo } from 'rxjs/operators';
import { IChangeList, ChangeType } from './docker-compose/graphic-editor/editor-form/editor-form.component';
import { ModelParserService } from '../Parser/ModelParser/model-parser.service';
import { FilesService } from '../files-service/files.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private readonly _fileSubject = new ReplaySubject<IConfigFile<IKeyValue<string>[]>>(1);
  private _file;
  private readonly _zeroElement: IKeyValue<string> = {
    id: '_0',
    key: 'key',
    value: 'value'
  }

  file$: Observable<IConfigFile<IKeyValue<string>[]> | undefined>;

  constructor(
    _filesService: FilesService,
    _route: ActivatedRoute,
    private _modelParser: ModelParserService
  ) {
    const fileId = +_route.snapshot.queryParams.fileId;
    this.file$ = this._fileSubject.asObservable();

    _filesService.getFileById$(fileId).pipe(
      map(e => {
        if (e == null) { return; }
        const data = JSON.parse(e.data);
        data.forEach((e, i) => {
          _modelParser.index(e, `_${i}`, null)
        });
        return { ...e, data }
      })
    ).subscribe(e => {
      this._file = e;
      this._fileSubject.next(e);
    })
  }

  changeFileData(changes: IChangeList) {
    if (this._file) {
      this._makeChange(changes, this._file.data);
      if (!this._file.data.length) {
        this._file.data.push(this._zeroElement)
      }
      this._fileSubject.next(this._file);
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
    const parentElement = targetElement.parent || { value: data };
    const index = parentElement.value.findIndex(e => e === targetElement);

    switch (changes.type) {
      case ChangeType.UPDATE:
        parentElement.value[index] = { ...parentElement.value[index], ...changes.data };
        break;

      case ChangeType.ADD:
        if (!changes.data) {
          const newElement: IKeyValue<string> = {}
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
          parentElement.value = this._zeroElement.value
        }
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
    if (!file.data.length) {
      file.data.push(this._zeroElement);
    }
    this._file = file;
    this._fileSubject.next(file);
  }

}
