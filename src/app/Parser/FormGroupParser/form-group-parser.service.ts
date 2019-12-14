import { FormGroup, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormGroupParserService {

  objectToFormGroup(object: any): FormGroup | undefined {
    if (new Object(object).constructor.name !== 'Object') {
      console.warn('Attempt to parse value that is not actually an object');
      return;
    }
    return this._objectToForm(object) as FormGroup;
  }

  parse(formGroup: FormGroup): any {
    return this._formToObject(formGroup);
  }

  private _formToObject(form: FormGroup | FormControl): any {
    if (form instanceof FormControl) {
      return form.value;
    }
    const group = {};
    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        group[key] = this._formToObject(form.controls[key] as  FormGroup | FormControl);
      }
    }
    return group;
  }

  private _objectToForm(object: any): FormGroup | FormControl {
    if (typeof object === 'string' || typeof object === 'number') {
      return new FormControl(object);
    }
    const group = {};
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        group[key] = this._objectToForm(object[key]);
      }
    }
    return new FormGroup(group);
  }
}
