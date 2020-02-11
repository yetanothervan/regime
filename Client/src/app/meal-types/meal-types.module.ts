import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MealTypesRoutingModule } from './meal-types-routing.module';
import { MealTypesShellComponent } from './containers/meal-types-shell/meal-types-shell.component';
import { MealTypesProviderComponent } from './containers/meal-types-provider/meal-types-provider.component';
import { MealTypesListComponent } from './components/meal-types-list/meal-types-list.component';
import { MealTypesItemRowComponent } from './components/meal-types-item-row/meal-types-item-row.component';


@NgModule({
  declarations: [MealTypesShellComponent, MealTypesProviderComponent, MealTypesListComponent, MealTypesItemRowComponent],
  imports: [
    CommonModule,
    MealTypesRoutingModule,
    ReactiveFormsModule
  ]
})
export class MealTypesModule { }
