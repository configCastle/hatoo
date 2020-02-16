import { Component } from '@angular/core';
import { Subject, combineLatest, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { IConfigFile } from 'src/app/sets-service/sets.service';
import { Form, FormGroupParserService } from 'src/app/Parser/FormGroupParser/form-group-parser.service';
import { EditorService } from '../editor-service/editor.service';

@Component({
	selector: 'app-graphic-editor',
	templateUrl: 'graphic-editor.component.html',
	styleUrls: ['graphic-editor.component.scss']
})
export class GraphicEditorComponent {
	private _completeSubject = new Subject<void>();

  file$: Observable<IConfigFile<Form>>;

	constructor(
    _editorService: EditorService,
    _formParser: FormGroupParserService
  ) {
    this.file$ = _editorService.selectedFile$
      .pipe(
        map(f => {
          const id = f.id;
          const name = f.name;
          const global = _formParser.objectToFormGroup(f.global);
          const services = _formParser.objectToFormGroup(f.services);
          
          this._completeSubject.next();
          
          combineLatest(
            global.valueChanges,
            services.valueChanges
          ).pipe(
            takeUntil(this._completeSubject)
          ).subscribe(([g, s]) => {
            _editorService.updateFile({
              id,
              name,
              global: g,
              services: s
            })
          })
          
          return { id, name, global, services }
        })
      )
	}

	ngOnDestroy() {
		this._completeSubject.next();
	}
}