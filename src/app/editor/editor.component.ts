import { Component, HostListener } from '@angular/core';
import { EditorService } from './editor.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.scss']
})
export class EditorComponent {
  @HostListener('window:resize')
  onResize() {
    this.textEditorWidth = window.innerWidth * 0.4 - 10;
  }

  textEditorWidth: number;
  fileName$: Observable<string>;

  constructor(_editorService: EditorService) {
    this.textEditorWidth = window.innerWidth * 0.4 - 10;
    this.fileName$ = _editorService.file$
      .pipe(map(s => s ? s.name : ''));
  }

}
