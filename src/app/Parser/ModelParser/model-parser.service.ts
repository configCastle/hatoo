import { Injectable } from '@angular/core';
import { IKeyValue } from 'src/app/sets-service/sets.service';
import { FormControl } from '@angular/forms';

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
      let i = 0;
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const index = `${indentKey}_${i}`;
          result.push({
            id: index,
            key,
            value: this._toKeyValue(object[key], index)
          });
          i++;
        }
      }
      return result.length ? result : object;
    }

    if (type === 'Array') {
      result = object.map((e, i) => {
        const index = `${indentKey}_${i}`;
        return { id: index, value: this._toKeyValue(e, index) };
      });
      return result.length ? result : null;
    }

    return object;
  }

  index(model: IKeyValue<string | FormControl>, firstIndex: string) {
    model.id = firstIndex;
    if (Array.isArray(model.value)) {
      for (let i = 0; i < model.value.length; i++) {
        const index = `${firstIndex}_${i}`;
        this.index(model.value[i], index);
      }
    }
  }
}
