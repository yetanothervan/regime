import { Observable, pipe, BehaviorSubject } from 'rxjs';
import { RationDay } from '../dtos/ration-day';
import { Store } from '@ngrx/store';
import { RootState } from '../root-store';
import { Ingredient } from '../dtos/ingredient';
import { Dish } from '../dtos/dish';
import { MealType } from '../dtos/meal-type';
import * as root from './../root-store'
import { MealModel } from './meal.model';

export class DayModel {
    constructor(day: RationDay, store: Store<RootState>) {
        this.ingredients$ = store.select(root.getEntitiesIngredients);
        this.dishes$ = store.select(root.getEntitiesDishes);
        this.mealTypes$ = store.select(root.getEntitiesMealTypes);

        const mealArray: MealModel[] =
            day.meals.map(m => new MealModel(m, this));
        this.meals$ = new BehaviorSubject(mealArray);
    }
    // lookups
    public ingredients$: Observable<Ingredient[]>;
    public dishes$: Observable<Dish[]>;
    public mealTypes$: Observable<MealType[]>;

    public meals$: BehaviorSubject<MealModel[]>;
}

