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
  setName$: Observable<string>;
  
	constructor(_editorService: EditorService) {
    this.setName$ = _editorService.set$
      .pipe(map(s => s.name));
	}

}
