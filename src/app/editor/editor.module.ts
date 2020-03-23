import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { UIModule } from '../ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { YAMLParserService } from '../Parser/YAMLParser/yaml-parser.service';
import { FormGroupParserService } from '../Parser/FormGroupParser/form-group-parser.service';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { EditorService } from './editor.service';
import { TextEditorService } from './text-editor.service';
import { GraphicEditorService } from './graphic-editor.service';
import { DockerComposeModule } from './docker-compose/docker-compose.module';

@NgModule({
  imports: [
    DockerComposeModule,
    CommonModule,
    ReactiveFormsModule,
    UIModule,
    MonacoEditorModule.forRoot()
  ],
  declarations: [
    EditorComponent
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
