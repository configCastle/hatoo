import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule
  ],
})
export class UIModule { }
