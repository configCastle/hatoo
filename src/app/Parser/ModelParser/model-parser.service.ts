import { Injectable } from '@angular/core';
import { IKeyValue } from 'src/app/sets-service/sets.service';

@Injectable({ providedIn: 'root' })
export class ModelParserService {
  modelToPlainObject(model: IKeyValue<string>[]): any {
    return this._toPlainObject(model);
  }

  plainObjectToModel(object: any): IKeyValue<string>[] {
    return this._toKeyValue(object);
  }

  private _toPlainObject(model: any): any {
    if (Array.isArray(model)) {
      const plainObject = {};
      const plainArray = new Array();
      for (const el of model) {
        if (el.key != null) {
          plainObject[el.key] = this._toPlainObject(el.value);
        } else {
          plainArray.push(
            this._toPlainObject(el.value)
          );
        }
      }
      return plainArray.length ? plainArray : plainObject;
    }
    return model;
  }

  private _toKeyValue(object: any) {
    const type = new Object(object).constructor.name;
    let result;

    if (type === 'Object') {
      result = new Array<IKeyValue<string>>();
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          result.push({
            key,
            value: this._toKeyValue(object[key])
          });
        }
      }
      return result.length ? result : object;
    }

    if (type === 'Array') {
      result = object.map(e => ({ value: this._toKeyValue(e) }));
      return result.length ? result : null;
    }

    return object;
  }
}
