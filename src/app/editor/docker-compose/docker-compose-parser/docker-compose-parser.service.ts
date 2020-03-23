import { Injectable } from "@angular/core";
import { YAMLParserService } from 'src/app/Parser/yaml-parser.service';
import { IKeyValue } from 'src/app/sets-service/sets.service';

@Injectable({ providedIn: 'root' })
export class DockerComposeParserService {
  constructor(private _yamlParser: YAMLParserService) { }
  
  stringToModel(yaml: string): IKeyValue[] {
    const plainObject = this._yamlParser.parse(yaml);
    return this._toKeyValue(plainObject);
  }

  private _toKeyValue(object: any) {
    const type = new Object(object).constructor.name;
    let result;

    if (type === 'Object') {
      result = new Array<IKeyValue>();
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

  modelToString(model: IKeyValue[]): string {
    const plainObject = this._toPlainObject(model);
    return this._yamlParser.objectToYAML(plainObject);
  }
}
