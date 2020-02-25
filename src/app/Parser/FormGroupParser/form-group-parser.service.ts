import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Injectable } from '@angular/core';

export type Form = FormControl | FormGroup | FormArray;

@Injectable()
export class FormGroupParserService {

  objectToFormGroup(object: any): Form | undefined {
    const type = new Object(object).constructor.name;
    if (type !== 'Object' && type !== 'Array') {
      console.warn('Attempt to parse value that is not actually an object');
      return;
    }
    return this._objectToForm(object) as FormGroup;
  }

  parse(formGroup: Form): any {
    return this._formToObject(formGroup);
  }

  private _formToObject(form: Form): any {
    if (form instanceof FormControl) {
      return form.value;
    }
    if (form instanceof FormArray) {
      return form.controls.map(c => this._formToObject(c as Form));
    }
    const group = {};
    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        group[key] = this._formToObject(form.controls[key] as  Form);
      }
    }
    return group;
  }

  private _objectToForm(object: any): Form {
    if (typeof object === 'string' || typeof object === 'number') {
      return new FormControl(object);
    }
    if (Array.isArray(object)) {
      return new FormArray(object.map(e => this._objectToForm(e)));
    }
    const result = {};
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        result[key] = this._objectToForm(object[key]);
      }
    }
    return new FormGroup(result);
  }
}
