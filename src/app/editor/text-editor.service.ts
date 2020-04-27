import { Injectable } from '@angular/core';
import { IConfigFile, IKeyValue } from 'src/app/sets-service/sets.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EditorService } from './editor.service';

@Injectable()
export class TextEditorService {
  private _skip: boolean;
  file$: Observable<IConfigFile<any>>;

  constructor(private _editorService: EditorService) {
    this.file$ = _editorService.file$.pipe(
      filter(() => this._skip ? this._skip = false : true)
    );
  }

  updateFile(file: IConfigFile<IKeyValue<string>[]>): void {
    this._skip = true;
    this._editorService.updateFile(file);
  }
}
