import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DishesShellComponent } from './containers/dishes-shell/dishes-shell.component';
import { DishesRoutingModule } from './dishes-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/dishes.reducer';
import { DishesTableComponent } from './components/dishes-table/dishes-table.component';
import { DishesProviderComponent } from './containers/dishes-provider/dishes-provider.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { DishesService } from './dishes.service';
import { DishesEffects } from './state/dishes.effects';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { DishItemComponent } from './containers/dish-item/dish-item.component';

@NgModule({
  declarations: [DishesShellComponent, DishesTableComponent, DishesProviderComponent, DishItemComponent],
  imports: [
    SharedModule,
    DishesRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    StoreModule.forFeature('dishes', reducer),
    EffectsModule.forFeature([DishesEffects])
  ],
  providers: [DishesService],
  bootstrap: []
})
export class DishesModule { }
