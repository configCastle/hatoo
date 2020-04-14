import { NgModule } from '@angular/core';
import { EditorElementComponent } from './graphic-editor/editor-form/editor-element/editor-element.component';
import { EditorFormComponent } from './graphic-editor/editor-form/editor-form.component';
import { GraphicEditorComponent } from './graphic-editor/graphic-editor.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { DCTextParserService } from './dc-text-parser.service';
import { DCFormParserService } from './dc-form-parser.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { DCMetaDataService } from './dc-meta-data.service';
import { ServicesService } from './services.service';
import { UIModule } from 'src/app/ui.module';
import { ServicesSelectSheetComponent } from './services-select-sheet/services-select-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
    UIModule
  ],
  exports: [
    EditorElementComponent,
    EditorFormComponent,
    GraphicEditorComponent,
    TextEditorComponent,
  ],
  declarations: [
    EditorElementComponent,
    EditorFormComponent,
    GraphicEditorComponent,
    TextEditorComponent,
    ServicesSelectSheetComponent
  ],
  providers: [
    DCTextParserService,
    DCFormParserService,
    DCMetaDataService,
    ServicesService
  ],
  entryComponents: [ServicesSelectSheetComponent]
})
export class DockerComposeModule { }
