import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { IngredientsService } from '../ingredients.service';
import * as ingActions from './ingredients.actions';
import { mergeMap, map, filter, tap } from 'rxjs/operators';
import { Ingredient } from 'src/app/dtos/ingredient';
import { IngredientsState, getIngredientById } from './ingredients.reducer';

@Injectable()
export class IngredientEffects {
    constructor(private actions$: Actions,
                private ingredientsService: IngredientsService) { }
    @Effect()
    loadIngredients$ = this.actions$.pipe(
        ofType(ingActions.IngredientsActionTypes.Load),
        mergeMap(
            (action: ingActions.Load) =>
                this.ingredientsService.getIngredients().pipe(
                    map((ingredients: Ingredient[]) => (new ingActions.LoadSuccess(ingredients)))
                ))
    );
}

