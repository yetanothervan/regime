import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MealTypesShellComponent } from './containers/meal-types-shell/meal-types-shell.component';
import { MealTypesProviderComponent } from './containers/meal-types-provider/meal-types-provider.component';


const routes: Routes = [
  { path: '', component: MealTypesShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: 'all', component: MealTypesProviderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealTypesRoutingModule { }
