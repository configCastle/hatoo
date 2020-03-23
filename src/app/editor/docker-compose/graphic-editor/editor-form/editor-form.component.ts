import { Component, Input, OnInit } from '@angular/core';
import { IKeyValue } from 'src/app/sets-service/sets.service';
import { Form } from 'src/app/Parser/FormGroupParser/form-group-parser.service';

@Component({
  selector: 'app-editor-form',
  templateUrl: 'editor-form.component.html',
  styleUrls: ['editor-form.component.scss']
})
export class EditorFormComponent {
  @Input() form: any;
}
