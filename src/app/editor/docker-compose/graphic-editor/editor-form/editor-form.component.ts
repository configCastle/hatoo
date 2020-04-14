import { Component, Input } from '@angular/core';
import { IKeyValue } from 'src/app/sets-service/sets.service';
import { FormControl } from '@angular/forms';

export interface IChangeList {
  id: string;
  data?: { key?: any; value?: any };
  type: ChangeType;
}

export enum defaultElementTypes {
  OBJECT_FIELD = 0,
  ARRAY_ELEMENT = 1,
  OBJECT = 2,
  ARRAY = 3
}

export enum ChangeType {
  UPDATE = 0,
  ADD = 1,
  REMOVE = 2,
  CHANGE_STRUCT = 3
}

@Component({
  selector: 'app-editor-form',
  templateUrl: 'editor-form.component.html',
  styleUrls: ['editor-form.component.scss']
})
export class EditorFormComponent {
  @Input() form: IKeyValue<FormControl>[];
}
