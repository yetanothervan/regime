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
        if (!day || !store) return;
        this.id = day.id;
        this.caption$ = new BehaviorSubject(day.caption);
        this.totalKkal$ = new BehaviorSubject(day.totalKkal);
        this.ingredients$ = store.select(root.getEntitiesIngredients);
        this.dishes$ = store.select(root.getEntitiesDishes);
        this.mealTypes$ = store.select(root.getEntitiesMealTypes);

        const mealArray: MealModel[] =
            day.meals.map(m => new MealModel(m, this));
        this.meals$ = new BehaviorSubject(mealArray);
    }

    public id: string;
    public caption$: BehaviorSubject<string>;
    public totalKkal$: BehaviorSubject<number>;

    // lookups
    public ingredients$: Observable<Ingredient[]>;
    public dishes$: Observable<Dish[]>;
    public mealTypes$: Observable<MealType[]>;

    public meals$: BehaviorSubject<MealModel[]>;

    public addNewMealType() {
    }
    public removeMealType(n: number) {
    }
}

