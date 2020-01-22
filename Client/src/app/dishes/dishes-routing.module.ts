import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DishesShellComponent } from './containers/dishes-shell/dishes-shell.component';
import { DishesProviderComponent } from './containers/dishes-provider/dishes-provider.component';

const routes: Routes = [
  {
    path: '', component: DishesShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: 'all', component: DishesProviderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishesRoutingModule { }
