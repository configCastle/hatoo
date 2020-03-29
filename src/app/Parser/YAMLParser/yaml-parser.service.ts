import { Injectable } from '@angular/core';
import { parse, stringify } from 'yaml';

@Injectable({
  providedIn: 'root'
})
export class YAMLParserService {

  parse(YAMLString: string): any {
    return parse(YAMLString);
  }

  objectToYAML(object: any): string {
    return stringify(object);
  }

}
