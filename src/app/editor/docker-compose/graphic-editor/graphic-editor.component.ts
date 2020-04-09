import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IConfigFile, IKeyValue } from 'src/app/sets-service/sets.service';
import { GraphicEditorService } from '../../graphic-editor.service';
import { DCFormParserService } from '../dc-form-parser.service';
import { IChangeList } from './editor-form/editor-form.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-graphic-editor',
  templateUrl: 'graphic-editor.component.html',
  styleUrls: ['graphic-editor.component.scss']
})
export class GraphicEditorComponent implements OnDestroy {
  private _completeSubject = new Subject<void>();
  file$: Observable<IConfigFile<IKeyValue<FormControl>[]>>;

  constructor(
    private _editorService: GraphicEditorService,
    _formParser: DCFormParserService
  ) {
    this.file$ = _editorService.file$
      .pipe(
        map(f => {
          return {
            ...f,
            data: _formParser.modelToFormGroup(f.data)
          };
        })
      );
  }

  change(id: number, value: IChangeList) {
    this._editorService.changeFileData(value);
  }

  ngOnDestroy() {
    this._completeSubject.next();
  }
}
