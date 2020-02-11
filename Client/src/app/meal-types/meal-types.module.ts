import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealTypesRoutingModule } from './meal-types-routing.module';
import { MealTypesShellComponent } from './containers/meal-types-shell/meal-types-shell.component';
import { MealTypesProviderComponent } from './containers/meal-types-provider/meal-types-provider.component';
import { MealTypesListComponent } from './components/meal-types-list/meal-types-list.component';


@NgModule({
  declarations: [MealTypesShellComponent, MealTypesProviderComponent, MealTypesListComponent],
  imports: [
    CommonModule,
    MealTypesRoutingModule
  ]
})
export class MealTypesModule { }
