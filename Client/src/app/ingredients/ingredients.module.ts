import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IngredientsShellComponent } from './containers/ingredients-shell/ingredients-shell.component';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/ingredients.reducer';
import { IngredientsTableComponent } from './components/ingredients-table/ingredients-table.component';
import { IngredientsService } from './ingredients.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { EffectsModule } from '@ngrx/effects';
import { IngredientEffects } from './state/ingredients.effects';
import { IngredientsProviderComponent } from './containers/ingredients-provider/ingredients-provider.component';


@NgModule({
  declarations: [IngredientsShellComponent, IngredientsTableComponent, IngredientsProviderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    IngredientsRoutingModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    StoreModule.forFeature('ingredients', reducer),
    EffectsModule.forFeature([IngredientEffects])
  ],
  providers: [IngredientsService],
  bootstrap: []
})
export class IngredientsModule { }
