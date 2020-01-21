import { Injectable } from '@angular/core';
import { Actions, ofType, Effect, act } from '@ngrx/effects';
import { IngredientsService } from '../ingredients.service';
import * as ingActions from './ingredients.actions';
import { mergeMap, map, filter, tap, catchError } from 'rxjs/operators';
import { Ingredient } from 'src/app/dtos/ingredient';
import { IngredientsState, getIngredientById } from './ingredients.reducer';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

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

    @Effect()
    updateIngredient$: Observable<Action> = this.actions$.pipe(
        ofType(ingActions.IngredientsActionTypes.Update),
        map((a: ingActions.Update) => a.payload),
        mergeMap(
            (ing: Ingredient) =>
                this.ingredientsService.updateIngredient(ing).pipe(
                    map((updatedIngredient: Ingredient) => (new ingActions.UpdateSuccess(updatedIngredient))),
                    catchError(err => of(new ingActions.UpdateFailed())) // TODO
                )
        )
    );

    @Effect()
    createIngredient$: Observable<Action> = this.actions$.pipe(
        ofType(ingActions.IngredientsActionTypes.Create),
        map((a: ingActions.Create) => a.payload),
        mergeMap(
            (ing: Ingredient) =>
                this.ingredientsService.createIngredient(ing).pipe(
                    map((createdIngredient: Ingredient) => (new ingActions.CreateSuccess(createdIngredient))),
                    catchError(err => of(new ingActions.CreateFailed())) // TODO
                )
        )
    );
}

