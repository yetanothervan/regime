import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngredientsShellComponent } from './containers/ingredients-shell/ingredients-shell.component';
import { IngredientItemComponent } from './containers/ingredient-item/ingredient-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IngredientsProviderComponent } from './containers/ingredients-provider/ingredients-provider.component';

const routes: Routes = [
  { path: '', component: IngredientsShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: 'all', component: IngredientsProviderComponent },
      { path: 'edit', component: IngredientItemComponent }
    ]
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientsRoutingModule { }
