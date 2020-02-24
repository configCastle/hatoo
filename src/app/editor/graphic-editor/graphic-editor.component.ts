import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subject, combineLatest, Observable } from 'rxjs';
import { takeUntil, map, tap, startWith, skip } from 'rxjs/operators';
import { IConfigFile } from 'src/app/sets-service/sets.service';
import { Form, FormGroupParserService } from 'src/app/Parser/FormGroupParser/form-group-parser.service';
import { GraphicEditorService } from './graphic-editor.service';

@Component({
	selector: 'app-graphic-editor',
	templateUrl: 'graphic-editor.component.html',
	styleUrls: ['graphic-editor.component.scss']
})
export class GraphicEditorComponent {
	private _completeSubject = new Subject<void>();

  file$: Observable<IConfigFile<Form>>;

	constructor(
    _editorService: GraphicEditorService,
    _formParser: FormGroupParserService
  ) {
    this.file$ = _editorService.file$
      .pipe(
        map(f => {
          const id = f.id;
          const name = f.name;
          const global = _formParser.objectToFormGroup(f.global);
          const services = _formParser.objectToFormGroup(f.services);
          this._completeSubject.next();

          new FormGroup({global, services}).valueChanges
          .pipe(
            takeUntil(this._completeSubject),
          ).subscribe(({g, s}) => {
            _editorService.updateFile({
              id,
              name,
              global: g || global.value,
              services: s || services.value
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