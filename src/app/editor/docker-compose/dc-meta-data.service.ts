import { Injectable } from '@angular/core';
import { IKeyValue } from 'src/app/sets-service/sets.service';
import { FormControl } from '@angular/forms';

interface IMetaDataRule {
  triggerFuntion(node: IKeyValue<string | FormControl>): boolean;
  actionFuntion(node: IKeyValue<string | FormControl>): void;
}

@Injectable({ providedIn: 'root' })
export class DCMetaDataService {

  private _metaDataRules: IMetaDataRule[] = [
    {
      triggerFuntion(node: IKeyValue<string | FormControl>): boolean {
        return node.parent ? node.parent.key === 'services' : false
      },
      actionFuntion(node: IKeyValue<string | FormControl>) {
        node.data = { isService: true }
      }
    }
  ]

  setRule(rule: IMetaDataRule) {
    this._metaDataRules.push(rule)
  }

  setMetaData(model: IKeyValue<string>) {
    if (Array.isArray(model.value)) {
      model.value.forEach(e => this.setMetaData(e))
    }
    this._metaDataRules.forEach(rule => {
      if (rule.triggerFuntion(model)) {
        rule.actionFuntion(model);
      }
    })
  }
}