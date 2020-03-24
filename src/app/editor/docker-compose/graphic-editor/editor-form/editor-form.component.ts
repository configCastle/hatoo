import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface IChangeList {
  id: string;
  subtree?: IChangeList;
  change?: { key?: any; value?: any };
}

@Component({
  selector: 'app-editor-form',
  templateUrl: 'editor-form.component.html',
  styleUrls: ['editor-form.component.scss']
})
export class EditorFormComponent {
  @Input() form: any;
  @Output() changed = new EventEmitter<IChangeList>();

  change(value: any) {
    this.changed.emit(value);
  }
}
