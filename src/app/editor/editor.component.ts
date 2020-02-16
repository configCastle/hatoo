import { Component } from '@angular/core';
import { EditorService } from './editor-service/editor.service';
import { SetsService, ISet, IConfigFile } from 'src/app/sets-service/sets.service';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Form } from 'src/app/Parser/FormGroupParser/form-group-parser.service';

@Component({
  selector: 'app-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.scss']
})
export class EditorComponent {

	set$: Observable<ISet<any>>;
	asString$: Observable<IConfigFile<string>>;
	asForm$: Observable<IConfigFile<Form>>;

	constructor(private _editorService: EditorService) {
		this.set$ = _editorService.set$;
		this.asString$ = _editorService.selectedFileAsString$;
		this.asForm$ = _editorService.selectedFileAsForm$;
	}

	setWithString(fileAsString: IConfigFile<string>) {
		this._editorService.setWithString(fileAsString);
	}

	setWithPlainObj(fileAsForm: IConfigFile<any>) {
		console.log('In editor component: ', fileAsForm);
		this._editorService.updateFile(fileAsForm);
	}

}
