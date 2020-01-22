import { Injectable } from '@angular/core';
import { Actions, ofType, Effect, act } from '@ngrx/effects';
import { DishesService } from '../dishes.service';
import * as dishesActions from './dishes.actions';
import { mergeMap, map } from 'rxjs/operators';
import { Dish } from 'src/app/dtos/dish';

@Injectable()
export class DishesEffects {
    constructor(private actions$: Actions,
                private dishesService: DishesService) { }
    @Effect()
    loadDishes$ = this.actions$.pipe(
        ofType(dishesActions.DishesActionTypes.Load),
        mergeMap(
            (action: dishesActions.Load) =>
                this.dishesService.getDishes().pipe(
                    map((dishes: Dish[]) => (new dishesActions.LoadSuccess(dishes)))
                ))
    );
}

