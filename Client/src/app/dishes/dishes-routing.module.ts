import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DishesShellComponent } from './containers/dishes-shell.component';

const routes: Routes = [
  {
    path: '',
    component: DishesShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishesRoutingModule { }
