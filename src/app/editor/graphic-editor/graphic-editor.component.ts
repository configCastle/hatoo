import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Form } from 'src/app/Parser/FormGroupParser/form-group-parser.service';
import { IConfigFile } from 'src/app/sets-service/sets.service';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-graphic-editor',
	templateUrl: 'graphic-editor.component.html',
	styleUrls: ['graphic-editor.component.scss']
})
export class GraphicEditorComponent implements OnInit {
	private _destroySubject = new Subject<void>();
	private _globalData: any;
	private _services: any;

	@Input() file: IConfigFile<Form>;
	@Output() fileChanged = new EventEmitter<IConfigFile<any>>();

	ngOnInit() {
		combineLatest(
			this.file.global.valueChanges,
			(this.file.services as FormArray).valueChanges
		)
		.pipe(takeUntil(this._destroySubject))
		.subscribe(([g, s]) => {
			console.log(this.file);
			this.fileChanged.emit({
				name: this.file.name,
				global: g,
				services: s
			})
		})
	}

	ngOnDestroy() {
		this._destroySubject.next();
	}
}