import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface IChangeList {
  id: string;
  subtree?: IChangeList;
  data?: { key?: any; value?: any };
  type: ChangeType;
}

export enum ChangeType {
  UPDATE = 0,
  ADD = 1,
  REMOVE = 2
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

  add() {
    if (!Array.isArray(this.form)) { return; }
    this.changed.emit({
      id: '',
      type: ChangeType.ADD
    });
  }
}
