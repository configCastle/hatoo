import { Injectable } from '@angular/core';
import { IKeyValue } from 'src/app/sets-service/sets.service';

@Injectable({ providedIn: 'root' })
export class ModelParserService {
  modelToPlainObject(model: IKeyValue<string>[]): any {
    return this._toPlainObject(model);
  }

  plainObjectToModel(object: any): IKeyValue<string>[] {
    return this._toKeyValue(object, '');
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

  private _toKeyValue(object: any, indentKey: string) {
    const type = new Object(object).constructor.name;
    let result;

    if (type === 'Object') {
      result = new Array<IKeyValue<string>>();
      let counter = 0;
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const index = indentKey + counter;
          result.push({
            _id: index,
            key,
            value: this._toKeyValue(object[key], index)
          });
          counter++;
        }
      }
      return result.length ? result : object;
    }

    if (type === 'Array') {
      result = object.map((e, i) => {
        const index = indentKey + i;
        return { _id: index, value: this._toKeyValue(e, index) };
      });
      return result.length ? result : null;
    }

    return object;
  }
}
