import { Component } from '@angular/core';
import { EditorService } from './editor.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.scss']
})
export class EditorComponent {
  fileName$: Observable<string>;

  constructor(_editorService: EditorService) {
    this.fileName$ = _editorService.file$
      .pipe(map(s => s ? s.name : ''));
  }

}
