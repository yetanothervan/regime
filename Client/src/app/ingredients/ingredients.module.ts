import { NgModule } from '@angular/core';
import { IngredientsShellComponent } from './containers/ingredients-shell/ingredients-shell.component';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { StoreModule } from '@ngrx/store';
import { IngredientsTableComponent } from './components/ingredients-table/ingredients-table.component';
import { IngredientsService } from './ingredients.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { EffectsModule } from '@ngrx/effects';
import { IngredientEffects } from './state/ingredients.effects';
import { IngredientsProviderComponent } from './containers/ingredients-provider/ingredients-provider.component';
import { IngredientItemComponent } from './containers/ingredient-item/ingredient-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IngredientFormComponent } from './components/ingredient-form/ingredient-form.component';
import * as myState from './state';
import * as myReducer from './state/ingredients.reducer';

@NgModule({
  declarations: [IngredientsShellComponent,
    IngredientsProviderComponent,
    IngredientsTableComponent,
    IngredientItemComponent,
    IngredientFormComponent],
  imports: [
    SharedModule,
    IngredientsRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    StoreModule.forFeature(myState.ingredientsFeatureKey, myReducer.reducer),
    EffectsModule.forFeature([IngredientEffects])
  ],
  providers: [IngredientsService],
  bootstrap: []
})
export class IngredientsModule { }
