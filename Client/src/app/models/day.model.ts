import { Observable, pipe, BehaviorSubject } from 'rxjs';
import { RationDay } from '../dtos/ration-day';
import { Store } from '@ngrx/store';
import { RootState } from '../root-store';
import { Ingredient } from '../dtos/ingredient';
import { Dish } from '../dtos/dish';
import { MealType } from '../dtos/meal-type';
import * as root from './../root-store'
import { MealModel } from './meal.model';
import { Meal } from '../dtos/meal';
import { v4 as uuid } from 'uuid';
import { MealItem } from '../dtos/meal-item';

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
        const newMeal = new Meal();
        newMeal.id = uuid();
        newMeal.mealItems = [];
        this.meals$.next([...this.meals$.value, new MealModel(newMeal, this)]);
    }
    public removeMealType(n: number) {
        const ms = this.meals$.value;
        ms.splice(n, 1);
        this.meals$.next(ms);
    }
    
    getDto(): RationDay {
        const dto = new RationDay();
        dto.id = this.id;
        dto.caption = this.caption$.value;
        dto.totalKkal = this.totalKkal$.value;
        dto.meals = [];
        this.meals$.value.forEach(m => {
            const meal = new Meal();
            meal.id = m.id;
            meal.mealTypeId = m.mealTypeId$.value;
            meal.mealItems = [];
            m.mealItems$.value.forEach(mi => {
                const item = new MealItem();
                item.id = mi.id;
                item.dishId = mi.dishId$.value;
                item.weight = mi.weight$.value;
                meal.mealItems.push(item);
            });
            dto.meals.push(meal);
        });
        return dto;
    }
}

