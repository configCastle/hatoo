import { Injectable, Inject } from '@angular/core';
import { IConfigFile, IKeyValue, FileTypes } from 'src/app/sets-service/sets.service';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IChangeList, ChangeType } from './docker-compose/graphic-editor/editor-form/editor-form.component';
import { ModelParserService } from '../Parser/ModelParser/model-parser.service';
import { FilesService } from '../files-service/files.service';
import { DCMetaDataService } from './docker-compose/dc-meta-data.service';
import { SavingService } from './sving.service';
import { YAMLParserService } from '../Parser/YAMLParser/yaml-parser.service';
import { DOCUMENT } from '@angular/common';
import { MatBottomSheet } from '@angular/material';
import { DeleteFileConfirmComponent } from './delete-confirm/delete-file-confirm.component';

@Injectable()
export class EditorService {

  private readonly _fileSubject = new ReplaySubject<IConfigFile<IKeyValue<string>[]> | undefined>(1);
  private _file;
  private readonly _zeroElement: IKeyValue<string> = {
    id: '_0',
    key: 'key',
    value: 'value'
  }
  private readonly _emptyFile: IConfigFile<IKeyValue<string>[]> = {
    id: -1,
    name: 'Your awesome docker-compose.yaml',
    configType: FileTypes.DOCKER_COMPOSE,
    data: [this._zeroElement],
    user: -1
  }

  file$: Observable<IConfigFile<IKeyValue<string>[]> | undefined>;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _filesService: FilesService,
    private _metaDataService: DCMetaDataService,
    private _modelParser: ModelParserService,
    private _savingService: SavingService,
    private _yamlParsr: YAMLParserService
  ) {
    this.file$ = this._fileSubject.asObservable();
  }

  saveFileData$(file: IConfigFile<IKeyValue<string>[]>): Observable<IConfigFile<string>> {
    return this._savingService.saveFileData$(file);
  }

  removeFile$(id: number): Observable<IConfigFile<string>> {
    return this._filesService.removeFile$(id);

  }

  selectFile(id: number) {
    if (id === -1) {
      this._file = this._emptyFile;
      this._fileSubject.next(this._emptyFile);
    } else {
      this._filesService.getFileById$(id).pipe(
        map(e => {
          if (e == null) { return; }
          const data = JSON.parse(e.data);
          if (!data.length) {
            data.push(this._zeroElement)
          }
          data.forEach((e, i) => {
            this._modelParser.index(e, `_${i}`, null)
            this._metaDataService.setMetaData(e);
          });
          return { ...e, data }
        })
      ).subscribe(
        (e: IConfigFile<IKeyValue<string>[]> | undefined) => {
          this._file = e;
          this._fileSubject.next(e);
        },
        () => this._fileSubject.next(undefined)
      )
    }
  }

  changeFileData(changes: IChangeList) {
    if (this._file) {
      this._makeChange(changes, this._file.data);
      if (!this._file.data.length) {
        this._file.data.push(this._zeroElement)
      }
      this._file.data.forEach(e => this._metaDataService.setMetaData(e));
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
        } else {
          parentElement.value.splice(index + 1, 0, changes.data)
        }
        this._modelParser.index(parentElement, parentElement.id, parentElement.parent)

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
    this._file.data.forEach(e => this._metaDataService.setMetaData(e));
    this._fileSubject.next(file);
  }

  downloadFile(file: IConfigFile<IKeyValue<string>[]>) {
    const fileData = file.data;
    const plainObjectData = this._modelParser.modelToPlainObject(fileData);
    const stringData = this._yamlParsr.objectToYAML(plainObjectData);
    const blobData = new Blob([stringData], { type: 'text/x-yaml' });
    let filename = 'docker-compose.yaml';

    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(blobData, filename);
    else {
      const link = this._document.createElement("a");
      const url = URL.createObjectURL(blobData);
      link.href = url;
      link.download = filename;
      this._document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        this._document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

}
