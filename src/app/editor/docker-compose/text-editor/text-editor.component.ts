import { Component, OnDestroy } from '@angular/core';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IConfigFile, FileTypes } from 'src/app/sets-service/sets.service';
import { TextEditorService } from '../../text-editor.service';
import { DCTextParserService } from '../dc-text-parser.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-ditor.component.html'
})
export class TextEditorComponent implements OnDestroy {
  private _updateSubject = new Subject<string>();
  private _destroySubject = new Subject<void>();
  private _code = '';
  private _file: IConfigFile<any>;

  get code() {
    return this._code;
  }

  set code(value: string) {
    if (this._code === value) { return; }
    this._code = value;
    this._updateSubject.next(value);
  }

  readonly editorOptions = {
    theme: 'vs-dark',
    language: 'yaml',
    tabSize: 2
  };

  constructor(
    _editorService: TextEditorService,
    _dockerComposeParserService: DCTextParserService,
    _authService: AuthService
  ) {
    this._updateSubject.pipe(
      takeUntil(this._destroySubject),
      debounceTime(200)
    ).subscribe(e => {
      const data = _dockerComposeParserService.stringToModel(e);
      if (data) {
        _editorService.updateFile({
          id: this._file.id,
          configType: FileTypes.DOCKER_COMPOSE,
          name: this._file.name,
          data,
          user: _authService.user.id
        });
      }
    })
    _editorService.file$
      .pipe(takeUntil(this._destroySubject))
      .subscribe(file => {
        this._file = file;
        this._code = _dockerComposeParserService.modelToString(file.data);
      });
  }

  ngOnDestroy() {
    this._destroySubject.next();
  }

}
