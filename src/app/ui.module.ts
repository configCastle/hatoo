import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule, MatButtonModule, MatMenuModule, MatTooltipModule, MatCheckboxModule } from '@angular/material';
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
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatButtonModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatButtonModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
  providers: [DataService]
})
export class UIModule { }
