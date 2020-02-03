import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DishShellComponent } from './containers/dish-shell/dish-shell.component';
import { DishItemComponent } from './containers/dish-item/dish-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DishProviderComponent } from './containers/dish-provider/dish-provider.component';
import { DishPathSaveGuard } from './state/dish-path-save.guard';

const routes: Routes = [
  { path: '', component: DishShellComponent,
    children: [
      { path: '', canActivate: [DishPathSaveGuard] },
      { path: 'all', component: DishProviderComponent },
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
export class DishRoutingModule { }
