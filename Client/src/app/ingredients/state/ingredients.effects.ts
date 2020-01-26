import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { IngredientsService } from '../ingredients.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Ingredient } from 'src/app/dtos/ingredient';
import { IngActions } from './';
import { RootActions } from 'src/app/root-store';


@Injectable()
export class IngredientEffects {
    constructor(private actions$: Actions,
                private ingredientsService: IngredientsService) { }

    updateIngredient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IngActions.ingredientsUpdate),
            mergeMap(
                (action) =>
                    this.ingredientsService.updateIngredient(action.ingredient).pipe(
                        map((ingredient: Ingredient) =>
                            (RootActions.ingredientsUpdateSuccess({ ingredient })))
                        // catchError(err => ) // TODO
                    )
            )));

    createIngredient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IngActions.ingredientsCreate),
            mergeMap(
                (action) =>
                    this.ingredientsService.createIngredient(action.ingredient).pipe(
                        map((ingredient: Ingredient) =>
                            (RootActions.ingredientsCreateSuccess({ ingredient })))
                        // catchError(err => ) // TODO
                    )
            )));
}

