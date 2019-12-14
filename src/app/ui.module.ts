import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

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
})
export class UIModule { }
