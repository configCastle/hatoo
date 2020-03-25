import { Injectable } from '@angular/core';
import { IKeyValue } from 'src/app/sets-service/sets.service';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class DCFormParserService {

  modelToFormGroup(model: IKeyValue<string>[]): IKeyValue<FormControl>[] {
    return this._toForm(model);
  }

  formGroupToModel(form: IKeyValue<FormControl>[]): IKeyValue<string>[] {
    return this._toModel(form);
  }

  private _toForm(model: any) {
    return model.map(e => {
      const formElement = {} as IKeyValue<FormControl>;
      if (e.key != null) {
        formElement.key = new FormControl(e.key);
      }
      if (Array.isArray(e.value)) {
        formElement.value = this._toForm(e.value);
      } else {
        formElement.value = new FormControl(e.value);
      }
      return { ...e, ...formElement };
    });
  }

  private _toModel(form: any) {
    return form.map(e => {
      const modelElement = {} as IKeyValue<string>;
      if (e.key != null) {
        modelElement.key = e.key.value;
      }
      if (Array.isArray(e.value)) {
        modelElement.value = this._toModel(e.value);
      } else {
        modelElement.value = e.value.value;
      }
      return { ...e, ...modelElement };
    });
  }

}
