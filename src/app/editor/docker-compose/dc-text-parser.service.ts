import { Injectable } from '@angular/core';
import { YAMLParserService } from 'src/app/Parser/YAMLParser/yaml-parser.service';
import { IKeyValue } from 'src/app/sets-service/sets.service';
import { ModelParserService } from 'src/app/Parser/ModelParser/model-parser.service';

@Injectable({ providedIn: 'root' })
export class DCTextParserService {
  constructor(
    private _yamlParser: YAMLParserService,
    private _modelParser: ModelParserService
  ) { }

  stringToModel(yaml: string): IKeyValue<string>[] {
    let plainObject;
    try {
      plainObject = this._yamlParser.parse(yaml);
    } catch (err) {
      console.error('Invalid YAML has been inserted');
      // TODO: we must somehow display to user status "INVALID"
    }
    return this._modelParser.plainObjectToModel(plainObject);
  }

  modelToString(model: IKeyValue<string>[]): string {
    const plainObject = this._modelParser.modelToPlainObject(model);
    return this._yamlParser.objectToYAML(plainObject);
  }
}
