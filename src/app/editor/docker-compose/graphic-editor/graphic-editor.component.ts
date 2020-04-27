import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IConfigFile, IKeyValue } from 'src/app/sets-service/sets.service';
import { GraphicEditorService } from '../../graphic-editor.service';
import { DCFormParserService } from '../dc-form-parser.service';
import { FormControl } from '@angular/forms';
import { IChangeList, ChangeType } from './editor-form/editor-form.component';

@Component({
  selector: 'app-graphic-editor',
  templateUrl: 'graphic-editor.component.html',
  styleUrls: ['graphic-editor.component.scss']
})
export class GraphicEditorComponent {
  file$: Observable<IConfigFile<IKeyValue<FormControl>[]>>;

  constructor(
    private _graphicEditorService: GraphicEditorService,
    _formParser: DCFormParserService
  ) {
    this.file$ = _graphicEditorService.file$
      .pipe(
        map(f => ({
          ...f,
          data: _formParser.modelToFormGroup(f.data)
        }))
      );
  }

  change(value: IChangeList) {
    this._graphicEditorService.changeFileData(value);
  }

}
