import { Component, OnInit } from '@angular/core';
import { EditorFormComponent } from '../editor-form.component';

@Component({
  selector: 'app-editor-element',
  templateUrl: 'editor-element.component.html',
  styleUrls: ['editor-element.component.scss']
})
export class EditorElementComponent extends EditorFormComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    console.log(this.form.value);
  }

  isArray() {
    return Array.isArray(this.form.value);
  }
}
