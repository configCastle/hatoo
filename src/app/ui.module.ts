import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { DataService } from './data-service/data.service';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    DataService
  ]
})
export class UIModule { }
