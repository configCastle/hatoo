import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { IConfigFile } from '../sets-service/sets.service';
import { EditorService } from './editor-service/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.scss'],
  providers: [EditorService]
})
export class EditorComponent {
  formGroups$: Observable<IConfigFile<FormGroup>[]>;

  constructor(_editorService: EditorService) {
    this.formGroups$ = _editorService.asFormGroups$;
    this.formGroups$.subscribe(console.log);
  }
}
