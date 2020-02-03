import { NgModule } from '@angular/core';
import { DishShellComponent } from './containers/dish-shell/dish-shell.component';
import { DishRoutingModule } from './dish-routing.module';
import { StoreModule } from '@ngrx/store';
import { DishTableComponent } from './components/dish-table/dish-table.component';
import { DishService } from './dish.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { EffectsModule } from '@ngrx/effects';
import { DishEffects } from './state/dish.effects';
import { DishProviderComponent } from './containers/dish-provider/dish-provider.component';
import { DishItemComponent } from './containers/dish-item/dish-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import * as myState from './state';
import * as myReducer from './state/dish.reducer';

@NgModule({
  declarations: [DishShellComponent,
    DishProviderComponent,
    DishTableComponent,
    DishItemComponent,
    DishFormComponent],
  imports: [
    SharedModule,
    DishRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    StoreModule.forFeature(myState.dishFeatureKey, myReducer.reducer),
    EffectsModule.forFeature([DishEffects])
  ],
  providers: [DishService],
  bootstrap: []
})
export class DishModule { }
