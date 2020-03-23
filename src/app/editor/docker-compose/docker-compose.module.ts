import { NgModule } from '@angular/core';
import { EditorElementComponent } from './graphic-editor/editor-form/editor-element/editor-element.component';
import { EditorFormComponent } from './graphic-editor/editor-form/editor-form.component';
import { GraphicEditorComponent } from './graphic-editor/graphic-editor.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { DCTextParserService } from './dc-text-parser.service';
import { DCFormParserService } from './dc-form-parser.service';
import { AddButtonComponent } from './graphic-editor/editor-form/editor-element/add-button/add-button.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot()
  ],
  exports: [
    EditorElementComponent,
    EditorFormComponent,
    GraphicEditorComponent,
    TextEditorComponent,
    AddButtonComponent
  ],
  declarations: [
    EditorElementComponent,
    EditorFormComponent,
    GraphicEditorComponent,
    TextEditorComponent,
    AddButtonComponent
  ],
  providers: [
    DCTextParserService,
    DCFormParserService
  ],
})
export class DockerComposeModule { }
