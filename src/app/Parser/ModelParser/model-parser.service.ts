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
      if (model.length) {
        if (model.every(e => e.key != null)) {
          const plainObject = {};
          for (const el of model) {
            plainObject[el.key] = this._toPlainObject(el.value);
          }
          return plainObject;
        }
        return model.map(e => {
          if (e.key) {
            return { [e.key]: this._toPlainObject(e.value) };
          }
          return this._toPlainObject(e.value);
        });
      }
      return '';
    }
    return model;
  }

  private _toKeyValue(object: any, indentKey: string) {
    const type = new Object(object).constructor.name;
    if (type === 'Object') {
      const result = new Array<IKeyValue<string>>();
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
      return result.length ? result : '';
    }

    if (type === 'Array') {
      const result = object.map((e, i) => {
        const index = `${indentKey}_${i}`;
        const type = new Object(e).constructor.name;
        if (type === 'Object') {
          for (const key in e) {
            if (e.hasOwnProperty(key)) {
              return {
                id: index,
                key,
                value: this._toKeyValue(e[key], index)
              }
            }
          }
          return '';
        }
        return {
          id: index,
          value: this._toKeyValue(e, index)
        };
      });
      return result.length ? result : '';
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
