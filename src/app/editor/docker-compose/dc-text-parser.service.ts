import { Injectable } from '@angular/core';
import { YAMLParserService } from 'src/app/Parser/YAMLParser/yaml-parser.service';
import { IKeyValue } from 'src/app/sets-service/sets.service';
import { ModelParserService } from 'src/app/Parser/ModelParser/model-parser.service';
import { ErrorsService } from '../errors-service/errors.service';

@Injectable({ providedIn: 'root' })
export class DCTextParserService {
  private _cachedModel = [];
  private _cachedString = '';

  constructor(
    private _yamlParser: YAMLParserService,
    private _modelParser: ModelParserService,
    private _errorsService: ErrorsService
  ) { }

  stringToModel(yaml: string): IKeyValue<string>[] {
    let plainObject;
    try {
      plainObject = this._yamlParser.parse(yaml);
    } catch (err) {
      console.warn('Invalid YAML has been inserted');
      this._errorsService.showError('Введён невалидный YAML')
      return this._cachedModel;
      // TODO: we must somehow display to user status "INVALID"
    }
    const type = new Object(plainObject).constructor.name;
    if (plainObject != null && (type === 'Object' || type === 'Array')) {
      const result = this._modelParser.plainObjectToModel(plainObject);
      this._cachedModel = result;
      return result;
    } else {
      this._errorsService.showError('Некорректный ввод')
      return this._cachedModel;
    }
  }

  modelToString(model: IKeyValue<string>[]): string {
    const plainObject = this._modelParser.modelToPlainObject(model);
    if (!plainObject) { return this._cachedString; }
    const string = this._yamlParser.objectToYAML(plainObject);
    this._cachedString = string;
    return string;
  }

  
}
