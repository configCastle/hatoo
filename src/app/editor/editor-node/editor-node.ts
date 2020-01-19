import { Input } from "@angular/core";
import { FormGroup, FormControl, FormArray } from '@angular/forms';

export class EditorNode {
  @Input() form: FormGroup | FormControl | FormArray;
  @Input() name: string;
  get isArray() {
    if (this.form instanceof FormArray) {
      return this.form.controls;
    }
  }
  get isGroup() {
    if (this.form instanceof FormGroup) {
      const arr = [];
      for (const o in (this.form as FormGroup).controls) {
        arr.push(o);
      }
      return arr;
    }
  }
}