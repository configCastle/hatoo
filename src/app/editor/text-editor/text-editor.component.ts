import { Component, Input, OnChanges } from '@angular/core';
import { EditorService } from '../editor-service/editor.service';
import { IConfigFile } from '../../sets-service/sets.service';
import { map } from 'rxjs/operators';
 
@Component({
  selector: 'app-text-editor',
  templateUrl: './text-ditor.component.html'
})
export class TextEditorComponent implements OnChanges {
  @Input() file: IConfigFile<string>;



  // global: _yamlParser.objectToYAML(f.global),
  // services: [_yamlParser.objectToYAML({ services: f.services })]



  code: string;
  // get code() {
  //   return this._code;
  // }
  // set code(value: string) {
  //   this._code = value;
  //   // this._editorService.setYaml(value);
  // }

  ngOnChanges() {
    console.log('In text editor', this.file);
    const global = this.file.global;
    const services = this.file.services;
    let servicesString = '';
    for (let i = 0; i < services.length; i++) {
      servicesString += `${services[i]}\n`;
    }
    this.code = `${global}\n${servicesString}`;
  }

  constructor(private _editorService: EditorService) {
    // _editorService.selectedFileAsString$.subscribe((e) => {
    //   const global = e.global;
    //   const services = e.services;
    //   let servicesString = '';
    //   for (let i = 0; i < services.length; i++) {
    //     servicesString += `${services[i]}\n`;
    //   }
    //   this._code = `${global}\n${servicesString}`;
    // })
  }

  editorOptions = {
    theme: 'vs-dark',
    language: 'yaml'
  };
}
