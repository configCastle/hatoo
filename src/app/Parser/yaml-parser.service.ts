import { Injectable } from '@angular/core';
import * as YAML from 'yaml';

@Injectable({
  providedIn: 'root'
})
export class YAMLParserService  {

  parse(YAMLString: string): any {
    return YAML.parse(YAMLString);
  }

  objectToYAML(object: any): string {
    return YAML.stringify(object);
  }

}
