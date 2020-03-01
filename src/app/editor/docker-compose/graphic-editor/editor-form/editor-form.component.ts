import { Component, Input } from "@angular/core";
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'editor-form',
  templateUrl: 'editor-form.component.html',
  styleUrls: ['editor-form.component.scss']
})
export class EditorFormComponent {
  @Input() form: FormGroup | FormControl | FormArray;


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
