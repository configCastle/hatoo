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
      console.log('FormArray', this.form.controls);
      return this.form.controls;
    }
  }
  get isGroup() {
    if (this.form instanceof FormGroup) {
      const arr = [];
      for (const o in (this.form as FormGroup).controls) {
        arr.push(o);
      }
      // console.log('FormGroup', arr);
      return arr;
    }
  }
  get isControl() {
    // console.log(this.form);
    
    if (this.form instanceof FormControl) {
      // console.log('FormControl', this.form);
      return this.form;
    }
  }
}
