import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'editor-element',
  templateUrl: 'editor-element.component.html',
  styleUrls: ['editor-element.component.scss']
})
export class EditorElementComponent {
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
  get isControl() {
    if (this.form instanceof FormControl) {
      return this.form;
    }
  }
}
