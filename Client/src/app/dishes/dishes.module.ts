import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishesShellComponent } from './containers/dishes-shell.component';
import { DishesRoutingModule } from './dishes-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/dishes.reducer';

@NgModule({
  declarations: [DishesShellComponent],
  imports: [
    CommonModule,
    DishesRoutingModule,
    StoreModule.forFeature('dishes', reducer)
  ],
  providers: [],
  bootstrap: []
})
export class DishesModule { }
