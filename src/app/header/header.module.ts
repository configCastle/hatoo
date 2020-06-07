import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { UIModule } from '../ui.module';
import { HeaderLeftComponent } from './header-left/header-left.component';
import { HeaderCenterComponent } from './header-center/header-center.component';
import { HeaderRightComponent } from './header-right/header-right.component';

@NgModule({
  imports: [
    UIModule
  ],
  exports: [
    HeaderComponent,
    HeaderLeftComponent,
    HeaderCenterComponent,
    HeaderRightComponent
  ],
  declarations: [
    HeaderComponent,
    HeaderLeftComponent,
    HeaderCenterComponent,
    HeaderRightComponent
  ],
  providers: [],
})
export class HeaderModule { }
