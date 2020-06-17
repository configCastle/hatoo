import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { MainPageGuard } from './auth/main-page.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [ MainPageGuard ],
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: 'dashboard',
    canActivate: [ AuthGuard ],
    component: DashboardComponent
  },
  {
    path: 'fast_editor',
    component: EditorComponent,
  },
  {
    path: ':file',
    canActivate: [ AuthGuard ],
    component: EditorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
