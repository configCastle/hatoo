import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { UIModule } from '../ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorElementComponent } from './docker-compose/graphic-editor/editor-form/editor-element/editor-element.component';
import { CommonModule } from '@angular/common';
import { YAMLParserService } from '../Parser/yaml-parser.service';
import { FormGroupParserService } from '../Parser/FormGroupParser/form-group-parser.service';
import { EditorFormComponent } from './docker-compose/graphic-editor/editor-form/editor-form.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { TextEditorComponent } from './docker-compose/text-editor/text-editor.component';
import { EditorService } from './editor.service';
import { GraphicEditorComponent } from './docker-compose/graphic-editor/graphic-editor.component'
import { TextEditorService } from './text-editor.service';
import { GraphicEditorService } from './graphic-editor.service';

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
    EditorService,
    GraphicEditorService,
    TextEditorService
  ]
})
export class EditorModule { }
