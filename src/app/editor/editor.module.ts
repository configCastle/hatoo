import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { UIModule } from '../ui.module';
import { CommonModule } from '@angular/common';
import { YAMLParserService } from '../Parser/YAMLParser/yaml-parser.service';
import { FormGroupParserService } from '../Parser/FormGroupParser/form-group-parser.service';
import { EditorService } from './editor.service';
import { TextEditorService } from './text-editor.service';
import { GraphicEditorService } from './graphic-editor.service';
import { DockerComposeModule } from './docker-compose/docker-compose.module';
import { DeleteFileConfirmComponent } from './delete-confirm/delete-file-confirm.component';
import { ErrorsService } from './errors-service/errors.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    DockerComposeModule,
    CommonModule,
    UIModule,
    RouterModule
  ],
  declarations: [
    EditorComponent,
    DeleteFileConfirmComponent
  ],
  entryComponents: [
    DeleteFileConfirmComponent
  ],
  providers: [
    YAMLParserService,
    FormGroupParserService,
    EditorService,
    GraphicEditorService,
    TextEditorService,
    ErrorsService
  ]
})
export class EditorModule { }
