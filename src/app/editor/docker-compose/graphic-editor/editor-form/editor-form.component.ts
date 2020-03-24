import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IKeyValue } from 'src/app/sets-service/sets.service';

@Component({
  selector: 'app-editor-form',
  templateUrl: 'editor-form.component.html',
  styleUrls: ['editor-form.component.scss']
})
export class EditorFormComponent {
  @Input() form: any;
  @Output() changed = new EventEmitter<IKeyValue<string>>();

}
