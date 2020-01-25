import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as rootActions from './root-store.actions';
import { mergeMap, map } from 'rxjs/operators';
import { Dish } from 'src/app/dtos/dish';
import { EntitiesService } from './entities.server';
import { Ingredient } from '../dtos/ingredient';

@Injectable()
export class RootStoreEffects {
    constructor(private actions$: Actions,
                private entitiesService: EntitiesService) { }
    @Effect()
    loadDishes$ = this.actions$.pipe(
        ofType(rootActions.dishesLoad),
        mergeMap(
            (action) =>
                this.entitiesService.getDishes().pipe(
                    map((dishes: Dish[]) => (rootActions.dishesLoadSuccess({dishes})))
                ))
    );

    @Effect()
    loadIngredients$ = this.actions$.pipe(
        ofType(rootActions.ingredientsLoad),
        mergeMap(
            (action) =>
                this.entitiesService.getIngredients().pipe(
                    map((ingredients: Ingredient[]) => (rootActions.ingredientsLoadSuccess({ingredients})))
                ))
    );
}

