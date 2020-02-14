import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: ShellComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'days'},
    { path: 'dishes',
    loadChildren: () => import('./dishes/dish.module').then(m => m.DishModule) },
    { path: 'ingredients',
    loadChildren: () => import('./ingredients/ingredients.module').then(m => m.IngredientsModule) },
    { path: 'meal-types',
    loadChildren: () => import('./meal-types/meal-types.module').then(m => m.MealTypesModule) },
    { path: 'days',
    loadChildren: () => import('./days/days.module').then(m => m.DaysModule) }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
