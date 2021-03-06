import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { DishService } from '../service/dish.service';
import { mergeMap, map,  withLatestFrom, catchError } from 'rxjs/operators';
import * as me from '.';
import * as root from 'src/app/root-store';
import { RootActions } from 'src/app/root-store';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { Dish } from 'src/app/dtos/dish';

@Injectable()
export class DishEffects {
    constructor(private actions$: Actions,
                private dishService: DishService,
                private store: Store<root.RootState>) { }

    updateDish$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.DishActions.dishUpdate),
            mergeMap(
                (action) =>
                    this.dishService.updateDish(action.dish).pipe(
                        map((dish: Dish) =>
                            (RootActions.dishUpdateSuccess({ dish })))
                        // catchError(err => ) // TODO
                    )
            )));

    createDish$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.DishActions.dishCreate),
            mergeMap(
                (action) =>
                    this.dishService.createDish(action.dish).pipe(
                        map((dish: Dish) =>
                            (RootActions.dishCreateSuccess({ dish })))
                        // catchError(err => ) // TODO
                    )
            )));

    deleteDish$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.DishActions.dishDelete),
            mergeMap(
                (action) =>
                    this.dishService.deleteDish(action.id).pipe(
                        map((id: string) =>
                            (RootActions.dishDeleteSuccess({ id }))),
                        catchError(err =>
                            (of(me.DishActions.dishDeleteFailed({ status: err.error }))))
                    )
            )));

    startEditing$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.DishActions.dishPathEditNavigated),
            withLatestFrom(this.store.pipe(select(me.getDishCurrentMutable))),
            mergeMap(
                ([action, current]) => {
                    if (!current || action.id !== current.id) {
                        return this.store.pipe(
                            select(root.getDishById(action.id)),
                            map(dish =>
                                me.DishActions.dishSetCurrentEditing({dish})
                            )
                        );
                    }
                    return of(me.DishActions.dishEmptyAction());
                }
            )
        ));
}

