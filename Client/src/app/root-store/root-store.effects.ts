import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as rootActions from './root-store.actions';
import { mergeMap, map } from 'rxjs/operators';
import { Dish } from 'src/app/dtos/dish';
import { EntitiesService } from './service/entities.server';
import { Ingredient } from '../dtos/ingredient';
import { MealType } from '../dtos/meal-type';
import { RationDay } from '../dtos/ration-day';

@Injectable()
export class RootStoreEffects {
    constructor(private actions$: Actions,
                private entitiesService: EntitiesService) { }
    @Effect()
    loadDishes$ = this.actions$.pipe(
        ofType(rootActions.dishLoad),
        mergeMap(
            (action) =>
                this.entitiesService.getDishes().pipe(
                    map((dishes: Dish[]) => (rootActions.dishLoadSuccess({dishes})))
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

    @Effect()
    loadMealTypes$ = this.actions$.pipe(
        ofType(rootActions.mealTypesLoad),
        mergeMap(
            (action) =>
                this.entitiesService.getMealTypes().pipe(
                    map((mealTypes: MealType[]) => (rootActions.mealTypesLoadSuccess({mealTypes})))
                ))
    );

    @Effect()
    loadDays$ = this.actions$.pipe(
        ofType(rootActions.daysLoad),
        mergeMap(
            (action) =>
                this.entitiesService.getDays().pipe(
                    map((days: RationDay[]) => (rootActions.daysLoadSuccess({days})))
                ))
    );
}

