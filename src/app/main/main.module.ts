import { MainRoutingModule } from './main-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderModule } from '../header/header.module';
import { UIModule } from '../ui.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    HeaderModule,
    UIModule,
    AuthModule
  ],
  declarations: [
    MainComponent
  ]
})
export class MainModule { }