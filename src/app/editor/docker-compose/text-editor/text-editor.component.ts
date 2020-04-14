import { Component, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IConfigFile, FileTypes } from 'src/app/sets-service/sets.service';
import { TextEditorService } from '../../text-editor.service';
import { DCTextParserService } from '../dc-text-parser.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-ditor.component.html'
})
export class TextEditorComponent implements OnDestroy {
  private _destroySubject = new Subject<void>();
  private _code = '';
  private _file: IConfigFile<any>;

  get code() {
    return this._code;
  }

  set code(value: string) {
    if (this._code === value) { return; }
    this._code = value;

    const data = this._dockerComposeParserService.stringToModel(value);
    if (data) {
      this._editorService.updateFile({
        id: this._file.id,
        configType: FileTypes.DOCKER_COMPOSE,
        name: this._file.name,
        data
      });
    }
  }

  readonly editorOptions = {
    theme: 'vs-dark',
    language: 'yaml',
    tabSize: 2
  };

  constructor(
    private _editorService: TextEditorService,
    private _dockerComposeParserService: DCTextParserService
  ) {
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
