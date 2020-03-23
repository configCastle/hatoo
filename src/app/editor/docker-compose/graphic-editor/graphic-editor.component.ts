import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IConfigFile } from 'src/app/sets-service/sets.service';
import { Form } from 'src/app/Parser/FormGroupParser/form-group-parser.service';
import { GraphicEditorService } from '../../graphic-editor.service';
import { DCFormParserService } from '../dc-form-parser.service';

@Component({
  selector: 'app-graphic-editor',
  templateUrl: 'graphic-editor.component.html',
  styleUrls: ['graphic-editor.component.scss']
})
export class GraphicEditorComponent implements OnDestroy {
  private _completeSubject = new Subject<void>();
  file$: Observable<IConfigFile<Form>>;

  constructor(
    _editorService: GraphicEditorService,
    _formParser: DCFormParserService
  ) {
    this.file$ = _editorService.file$
      .pipe(
        map(f => {
          const id = f.id;
          const name = f.name;
          const type = f.type;
          const data = _formParser.modelToFormGroup(f.data);


          // this._completeSubject.next();
          // data.valueChanges
          //   .pipe(
          //     takeUntil(this._completeSubject),
          //   ).subscribe(e => {
          //     _editorService.updateFile({
          //       id,
          //       type,
          //       name,
          //       data: e
          //     });
          //   });

          return { id, type, name, data };
        })
      );
  }

  ngOnDestroy() {
    this._completeSubject.next();
  }
}
