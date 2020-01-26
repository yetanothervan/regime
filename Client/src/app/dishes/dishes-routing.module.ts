import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DishesShellComponent } from './containers/dishes-shell/dishes-shell.component';
import { DishesProviderComponent } from './containers/dishes-provider/dishes-provider.component';
import { DishItemComponent } from './containers/dish-item/dish-item.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: DishesShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: 'all', component: DishesProviderComponent },
      { path: 'edit', component: DishItemComponent }
    ]
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishesRoutingModule { }
