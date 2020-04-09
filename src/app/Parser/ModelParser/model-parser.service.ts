import { Injectable } from '@angular/core';
import { IKeyValue } from 'src/app/sets-service/sets.service';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ModelParserService {

  modelToPlainObject(model: IKeyValue<string>[]): any {
    return this._toPlainObject(model);
  }

  plainObjectToModel(object: any): IKeyValue<string>[] {
    const model = this._toKeyValue(object);
    model.forEach((e, i) => {
      this.index(e, `_${i}`, null)
    })
    return model;
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

  private _toKeyValue(object: any) {
    const type = new Object(object).constructor.name;
    if (type === 'Object') {
      const result = new Array<IKeyValue<string>>();
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const newElement: IKeyValue<string> = { key }
          newElement.value = this._toKeyValue(object[key])
          result.push(newElement);
        }
      }
      return result.length ? result : '';
    }

    if (type === 'Array') {
      const result = object.map(e => {
        const type = new Object(e).constructor.name;
        if (type === 'Object') {
          for (const key in e) {
            if (e.hasOwnProperty(key)) {
              const newElement: IKeyValue<string> = { key }
              newElement.value = this._toKeyValue(e[key])
              return newElement;
            }
          }
          return '';
        }
        const newElement: IKeyValue<string> = { }
        newElement.value = this._toKeyValue(e)
        return newElement;
      });
      return result.length ? result : '';
    }

    return object;
  }

  index(model: IKeyValue<string | FormControl>, firstIndex: string, parent: IKeyValue<string | FormControl>) {
    model.id = firstIndex;
    model.parent = parent;
    if (Array.isArray(model.value)) {
      for (let i = 0; i < model.value.length; i++) {
        const index = `${firstIndex}_${i}`;
        this.index(model.value[i], index, model);
      }
    }
  }
}
