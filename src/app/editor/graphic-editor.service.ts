import { Injectable } from '@angular/core';
import { IConfigFile } from 'src/app/sets-service/sets.service';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { EditorService } from './editor.service';

@Injectable({ providedIn: 'root' })
export class GraphicEditorService {
  private _skip: boolean;
  file$: Observable<IConfigFile<any>>;

  constructor(private _editorService: EditorService) {
    this.file$ = _editorService.file$.pipe(
      filter(() => this._skip ? this._skip = false : true ),
    );
  }

  updateFile(file: IConfigFile<any>): void {
    this._skip = true;
    this._editorService.updateFile(file);
  }
}
