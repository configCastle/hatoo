import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IConfigFile } from 'src/app/sets-service/sets.service';
import { Form } from 'src/app/Parser/FormGroupParser/form-group-parser.service';
import { GraphicEditorService } from '../../graphic-editor.service';
import { DCFormParserService } from '../dc-form-parser.service';
import { IChangeList } from './editor-form/editor-form.component';

@Component({
  selector: 'app-graphic-editor',
  templateUrl: 'graphic-editor.component.html',
  styleUrls: ['graphic-editor.component.scss']
})
export class GraphicEditorComponent implements OnDestroy {
  private _completeSubject = new Subject<void>();
  file$: Observable<IConfigFile<Form>>;

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
    this._editorService.changeFileData(id, value);
  }

  ngOnDestroy() {
    this._completeSubject.next();
  }
}
