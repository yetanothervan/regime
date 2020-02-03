import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { RootActions } from 'src/app/root-store';
import { DishesService } from '../dishes.service';
import { DishesActions } from '.';
import { Dish } from 'src/app/dtos/dish';


@Injectable()
export class DishesEffects {
    constructor(private actions$: Actions,
                private dishesService: DishesService) { }

    updateDishes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DishesActions.dishesUpdate),
            mergeMap(
                (action) =>
                    this.dishesService.updateDish(action.dish).pipe(
                        map((dish: Dish) =>
                            (RootActions.dishUpdateSuccess({ dish })))
                        // catchError(err => ) // TODO
                    )
            )));

    createDishes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DishesActions.dishesCreate),
            mergeMap(
                (action) =>
                    this.dishesService.createDish(action.dish).pipe(
                        map((dish: Dish) =>
                            (RootActions.dishCreateSuccess({ dish })))
                        // catchError(err => ) // TODO
                    )
            )));
}

