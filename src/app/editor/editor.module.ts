import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { UIModule } from '../ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorNodeComponent } from './editor-node/editor-node.component';
import { CommonModule } from '@angular/common';
import { YAMLParserService } from '../Parser/yaml-parser.service';
import { FormGroupParserService } from '../Parser/FormGroupParser/form-group-parser.service';
import { EditorFormComponent } from './editor-form/editor-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UIModule
  ],
  declarations: [
    EditorComponent,
    EditorNodeComponent,
    EditorFormComponent
  ],
  providers: [
    YAMLParserService,
    FormGroupParserService
  ]
})
export class EditorModule { }
