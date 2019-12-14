import { Component, Input } from '@angular/core';

export interface ITextInput {
  type: 'text';
  placeholder: string;
}

export interface ISelectInput {
  type: 'select';
  placepolder: string;
  options: any[];
}

@Component({
  selector: 'app-editor-element',
  templateUrl: 'editor-element.component.html',
  styleUrls: ['editor-element.component.scss']
})
export class EditorElementComponent {
  @Input() title = 'key';
  @Input() inputs: Array<ITextInput | ISelectInput> = [];
}
