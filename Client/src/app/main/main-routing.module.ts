import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainShellComponent } from './containers/main-shell/main-shell.component';

const routes: Routes = [
  {
    path: '',
    component: MainShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
