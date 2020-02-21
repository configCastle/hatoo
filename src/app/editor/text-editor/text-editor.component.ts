import { Component, OnDestroy } from '@angular/core';
import { EditorService } from '../editor-service/editor.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { YAMLParserService } from 'src/app/Parser/yaml-parser.service';
import { IConfigFile } from 'src/app/sets-service/sets.service';
 
@Component({
  selector: 'app-text-editor',
  templateUrl: './text-ditor.component.html'
})
export class TextEditorComponent implements OnDestroy {
  private _destroySubject = new Subject<void>();
  private _code: string = '';
  private _file: IConfigFile<any>;

  get code() {
    return this._code;
  }
  
  set code(value: string) {
    this._code = value;
    const converted = this._yamlParser.parse(value);
    let global = {};
    for (const key in converted) {
      if (key !== 'services') { global[key] = converted[key] }
    }
    this._editorService.updateFile({
      id: this._file.id,
      name: this._file.name,
      global: global,
      services: converted.services || []
    })
  }

  readonly editorOptions = {
    theme: 'vs-dark',
    language: 'yaml'
  };

  constructor(
    private _editorService: EditorService,
    private _yamlParser: YAMLParserService
  ) {
    _editorService.selectedFile$
      .pipe(takeUntil(this._destroySubject))
      .subscribe(file => {
        this._file = file;
        const global = _yamlParser.objectToYAML(file.global);
        const services = _yamlParser.objectToYAML({ services: file.services });
        // let servicesString = '';
        // for (let i = 0; i < services.length; i++) {
        //   servicesString += `${services[i]}\n`;
        // }
        this._code = `${global}\n${services}`;
      });
  }

  ngOnDestroy() {
    this._destroySubject.next();
  }

}
