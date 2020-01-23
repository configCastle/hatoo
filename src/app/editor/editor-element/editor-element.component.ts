import { Component } from "@angular/core";
import { FormControl } from '@angular/forms';
import { EditorFormComponent } from '../editor-form/editor-form.component';

@Component({
  selector: 'editor-element',
  templateUrl: 'editor-element.component.html',
  styleUrls: ['editor-element.component.scss']
})
export class EditorElementComponent extends EditorFormComponent {
  get isControl() {
    if (this.form instanceof FormControl) {
      return this.form;
    }
  }
}
