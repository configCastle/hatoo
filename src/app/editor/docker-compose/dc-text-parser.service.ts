import { Injectable } from '@angular/core';
import { IKeyValue } from 'src/app/sets-service/sets.service';
import * as YAML from 'yaml';
import { ModelParserService } from 'src/app/Parser/ModelParser/model-parser.service';

@Injectable({ providedIn: 'root' })
export class DCTextParserService {

  constructor(private _modelParser: ModelParserService) { }

  modelToString(model: IKeyValue<string>[]): string {
    const document = new YAML.Document();
    return ''
  }

  private _toDocument(node) {

  }

  stringToModel(value: string, s = {}): IKeyValue<string>[] | undefined {
    const document = YAML.parseDocument(value, s);
    let model;
    model = this._toModel(document.contents);
    if (!Array.isArray(model)) { return; }
    model.forEach((e, i) => this._modelParser.index(e, `_${i}`));
    return model;
  }

  private _toModel(node) {
    if (node == null) { return node; }
    if (!node || !node.type) { return node; }
    if (
      node.type === 'PLAIN' ||
      node.type === 'QUOTE_SINGLE' ||
      node.type === 'QUOTE_DOUBLE'  
    ) {
      return node.value;
    }
    if (
      node.type === 'MAP' ||
      node.type === 'FLOW_MAP' ||
      node.type === 'SEQ' ||
      node.type === 'FLOW_SEQ'
    ) {
      return node.items.filter(e => e).map(e => {
        const res: IKeyValue<string> = {};
        if (e.type === 'MAP' || node.type === 'FLOW_MAP') {
          if (e.items[0].key) { res.key = this._toModel(e.items[0].key); }
          res.value = this._toModel(e.items[0].value);
        } else {
          res.value = this._toModel(e.value);
          if (e.key) { res.key = this._toModel(e.key); }
        }
        return res;
      })
    }
    
  }

}
