import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngredientsShellComponent } from './containers/ingredients-shell/ingredients-shell.component';

const routes: Routes = [
  {
    path: '',
    component: IngredientsShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientsRoutingModule { }
