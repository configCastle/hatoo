import { Injectable } from '@angular/core';
import { IConfigFile, IKeyValue } from 'src/app/sets-service/sets.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EditorService } from './editor.service';
import { IChangeList, ChangeType } from './docker-compose/graphic-editor/editor-form/editor-form.component';

@Injectable()
export class GraphicEditorService {
  private _skip: boolean;
  file$: Observable<IConfigFile<IKeyValue<string>[]>>;

  constructor(private _editorService: EditorService) {
    this.file$ = _editorService.file$.pipe(
      filter(() => this._skip ? this._skip = false : true),
    );
  }

  changeFileData(change: IChangeList) {
    if (change.type === ChangeType.UPDATE) {
      this._skip = true;
    }
    this._editorService.changeFileData(change);
  }

}
