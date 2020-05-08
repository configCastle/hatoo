import { Injectable } from "@angular/core";
import { FilesService } from '../files-service/files.service';
import { ModelParserService } from '../Parser/ModelParser/model-parser.service';
import { IConfigFile, IKeyValue } from '../sets-service/sets.service';
import { IUpdateFileData } from '../data-service/data.service';
import { Observable } from 'rxjs';

export interface IPlainKeyValue {
  key: any;
  value: any;
}

@Injectable({providedIn: 'root'})
export class SavingService {
  constructor(private _filesService: FilesService) { }

  saveFileData$(file: IConfigFile<IKeyValue<string>[]>): Observable<IConfigFile<string>> {
    const plainKeyValue = this.removeMetaData(file.data);
    const preparedData = JSON.stringify(plainKeyValue);
    const updateData: IUpdateFileData = {
      id: +file.id,
      data: preparedData
    }
    return this._filesService.updateFile$(updateData)
  }

  removeMetaData(model: IKeyValue<string>[]): IKeyValue<string>[] {
    return model.map(e => this._returnOnlyKeyValue(e))
  }

  private _returnOnlyKeyValue(item: IKeyValue<string>): IPlainKeyValue {
    const newItem: any = {
      value: item.value
    }
    if (item.key != null) { newItem.key = item.key }
    if (Array.isArray(item.value)) {
      newItem.value = item.value.map(e => this._returnOnlyKeyValue(e))
    }
    return newItem;
  }

}