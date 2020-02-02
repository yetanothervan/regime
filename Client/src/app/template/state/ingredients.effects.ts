import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, act } from '@ngrx/effects';
import { IngredientsService } from '../ingredients.service';
import { mergeMap, map, catchError, tap, withLatestFrom, mergeAll, take, takeWhile } from 'rxjs/operators';
import { Ingredient } from 'src/app/dtos/ingredient';
import * as me from '.';
import * as root from 'src/app/root-store';
import { RootActions } from 'src/app/root-store';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';


@Injectable()
export class IngredientEffects {
    constructor(private actions$: Actions,
                private ingredientsService: IngredientsService,
                private store: Store<root.RootState>) { }

    updateIngredient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.IngActions.ingredientsUpdate),
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
            ofType(me.IngActions.ingredientsCreate),
            mergeMap(
                (action) =>
                    this.ingredientsService.createIngredient(action.ingredient).pipe(
                        map((ingredient: Ingredient) =>
                            (RootActions.ingredientsCreateSuccess({ ingredient })))
                        // catchError(err => ) // TODO
                    )
            )));

    startEditing$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.IngActions.ingredientsPathEditNavigated),
            withLatestFrom(this.store.pipe(select(me.getIngredientCurrent))),
            mergeMap(
                ([action, current]) => {
                    if (action.id !== current.id) {
                        return this.store.pipe(
                            select(root.getIngredientById(action.id)),
                            map(ingredient =>
                                me.IngActions.ingredientsSetCurrentEditing({ingredient})
                            )
                        );
                    }
                    return of(me.IngActions.ingredientsEmptyAction());
                }
            )
        ));
}

