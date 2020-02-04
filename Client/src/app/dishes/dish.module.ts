import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';

import { DishRoutingModule } from './dish-routing.module';
import { DishService } from './dish.service';
import { DishEffects } from './state/dish.effects';
import * as myState from './state';
import * as myReducer from './state/dish.reducer';

import { DishShellComponent } from './containers/dish-shell/dish-shell.component';
import { DishProviderComponent } from './containers/dish-provider/dish-provider.component';
import { DishItemComponent } from './containers/dish-item/dish-item.component';

import { DishTableComponent } from './components/dish-table/dish-table.component';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import { DishNutrientsComponent } from './components/dish-nutrients/dish-nutrients.component';
import { DishItemRowComponent } from './components/dish-item-row/dish-item-row.component';

@NgModule({
  declarations: [DishShellComponent,
    DishProviderComponent,
    DishTableComponent,
    DishItemComponent,
    DishFormComponent,
    DishNutrientsComponent,
    DishItemRowComponent],
  imports: [
    SharedModule,
    DishRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    StoreModule.forFeature(myState.dishFeatureKey, myReducer.reducer),
    EffectsModule.forFeature([DishEffects])
  ],
  providers: [DishService],
  bootstrap: []
})
export class DishModule { }
