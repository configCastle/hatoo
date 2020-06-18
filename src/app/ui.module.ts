import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatInputModule,
  MatButtonModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatRippleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatDialogModule
} from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatBottomSheetModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { DataService } from './data-service/data.service';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [DataService]
})
export class UIModule { }
