import * as me from '.';
import * as root from 'src/app/root-store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { MealTypesService } from '../service/meal-types.service';
import { Injectable } from '@angular/core';
import { MealType } from 'src/app/dtos/meal-type';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MealTypesEffects {
    constructor(private actions$: Actions,
                private mealTypesService: MealTypesService) { }

    updateMealType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.MealTypesActions.mealTypeUpdate),
            mergeMap(
                (action) =>
                    this.mealTypesService.updateMealType(action.mealType).pipe(
                        map((mealType: MealType) =>
                            (root.RootActions.mealTypeUpdateSuccess({ mealType })))
                        // catchError(err => ) // TODO
                    )
            )));

    createMealType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.MealTypesActions.mealTypeCreate),
            mergeMap(
                (action) =>
                    this.mealTypesService.createMealType(action.mealType).pipe(
                        map((mealType: MealType) =>
                            (root.RootActions.mealTypeCreateSuccess({ mealType })))
                        // catchError(err => ) // TODO
                    )
            )));

    deleteMealType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.MealTypesActions.mealTypeDelete),
            mergeMap(
                (action) =>
                    this.mealTypesService.deleteMealType(action.id).pipe(
                        map((id: string) =>
                            (root.RootActions.mealTypeDeleteSuccess({ id }))),
                        catchError(err =>
                            (of(me.MealTypesActions.mealTypeDeleteFailed({ status: err.error }))))
                    )
            )));
}