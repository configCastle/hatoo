import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { UIModule } from '../ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorElementComponent } from './editor-element/editor-element.component';
import { CommonModule } from '@angular/common';
import { YAMLParserService } from '../Parser/yaml-parser.service';
import { FormGroupParserService } from '../Parser/FormGroupParser/form-group-parser.service';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { EditorService } from './editor-service/editor.service';
import { GraphicEditorComponent } from './graphic-editor/graphic-editor.component'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UIModule,
    MonacoEditorModule.forRoot()
  ],
  declarations: [
    EditorComponent,
    EditorElementComponent,
    EditorFormComponent,
    GraphicEditorComponent,
    TextEditorComponent
  ],
  providers: [
    YAMLParserService,
    FormGroupParserService,
    EditorService
  ]
})
export class EditorModule { }
