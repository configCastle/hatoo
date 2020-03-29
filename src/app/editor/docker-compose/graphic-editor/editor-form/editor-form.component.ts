import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface IChangeList {
  id: string;
  subtree?: IChangeList;
  data?: { key?: any; value?: any };
  type: ChangeType;
}

export enum objectTypes {
  OBJECT_FIELD = 0,
  ARRAY_ELEMENT = 1,
  OBJECT = 2,
  ARRAY = 3
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

  protected objectTypeDefs = {
    [objectTypes.OBJECT_FIELD]: JSON.stringify({ key: 'key', value: 'value' }),
    [objectTypes.ARRAY_ELEMENT]: JSON.stringify({ value: '' }),
    [objectTypes.OBJECT]: JSON.stringify({ key: 'key', value: [{ key: 'key', value: 'value' }] }),
    [objectTypes.ARRAY]: JSON.stringify({ key: 'key', value: [{ value: 'value' }] }),
  };

  change(value: any) {
    this.changed.emit(value);
  }

  add(type: number) {
    if (!Array.isArray(this.form)) { return; }
    this.changed.emit({
      id: null,
      type: ChangeType.ADD,
      data: JSON.parse(this.objectTypeDefs[type])
    });
  }
}
