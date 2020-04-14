import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatBottomSheetModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { DataService } from './data-service/data.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatButtonModule
  ],
  providers: [DataService]
})
export class UIModule { }
