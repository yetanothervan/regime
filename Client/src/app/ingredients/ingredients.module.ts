import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsShellComponent } from './containers/ingredients-shell.component';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/ingredients.reducer';

@NgModule({
  declarations: [IngredientsShellComponent],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    StoreModule.forFeature('ingredients', reducer)
  ],
  providers: [],
  bootstrap: []
})
export class IngredientsModule { }
