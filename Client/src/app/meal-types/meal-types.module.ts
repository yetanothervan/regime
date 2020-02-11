import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealTypesRoutingModule } from './meal-types-routing.module';
import { MealTypesShellComponent } from './containers/meal-types-shell/meal-types-shell.component';
import { MealTypesProviderComponent } from './containers/meal-types-provider/meal-types-provider.component';


@NgModule({
  declarations: [MealTypesShellComponent, MealTypesProviderComponent],
  imports: [
    CommonModule,
    MealTypesRoutingModule
  ]
})
export class MealTypesModule { }
