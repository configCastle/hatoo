import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ISet, IConfigFile } from '../sets-service/sets.service';
import { EditorService } from './editor-service/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.scss'],
  providers: [EditorService]
})
export class EditorComponent implements OnDestroy {
  private _destroySubject = new Subject<void>();
  
  set$: Observable<ISet<FormGroup>>;
  selectedConfigFile: IConfigFile<FormGroup>;
  
  constructor(_editorService: EditorService) {
    this.set$ = _editorService.asFormGroup$;
    this.set$.subscribe(set => { // TODO normal selection by text editor
      console.log(set);
      
      this.selectConfigFile(set.config_files[0]);
    })
  }

  selectConfigFile(configFile: IConfigFile<FormGroup>) {
    this.selectedConfigFile = configFile;
  }

  ngOnDestroy() {
    this._destroySubject.next();
  }
}
