import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { UIModule } from '../ui.module';
import { FilesService } from '../files-service/files.service';
import { RouterModule } from '@angular/router';
import { CreateFileFormComponent } from './add-file-form/create-file-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        UIModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        DashboardComponent
    ],
    declarations: [
        DashboardComponent,
        CreateFileFormComponent
    ],
    entryComponents: [CreateFileFormComponent],
    providers: [FilesService],
})
export class DashboardModule { }
