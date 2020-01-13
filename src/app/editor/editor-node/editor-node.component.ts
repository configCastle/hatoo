import { Component, Input } from "@angular/core";
import { FormGroup, FormControl, FormArray } from '@angular/forms';


@Component({
  selector: 'editor-node',
  templateUrl: 'editor-node.component.html',
  styleUrls: ['editor-node.component.scss']
})
export class EditorNodeComponent {
  @Input() form: FormGroup | FormControl;
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