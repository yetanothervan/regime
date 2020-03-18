import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
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
import { map, mergeMap } from 'rxjs/operators';
import { ModelService } from './model.static';
import { WholeDayNutrientTargetPercent, WholeDayNutrientTotals, WholeDayNutrientIndicator } from './day-indicator.model';

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
            day.meals?.map(m => new MealModel(m, this)) ?? [];
        this.meals$ = new BehaviorSubject(mealArray);

        this.dayTargets$ = this.meals$.asObservable().pipe(
            mergeMap(meals => {
                return combineLatest(meals.map(m => m.mealType$)).pipe(
                    map(mt => ModelService.getDayTargets(mt))
                );
            })
        )

        this.dayTotals$ = this.meals$.asObservable().pipe(
            mergeMap(meals => {
                const pt = combineLatest(meals.map(m => m.totalProtein$)).pipe(
                    map(pts => pts.reduce((d, s) => d + s, 0))
                );
                const ft = combineLatest(meals.map(m => m.totalFat$)).pipe(
                    map(fts => fts.reduce((d, s) => d + s, 0))
                );
                const ct = combineLatest(meals.map(m => m.totalCarbon$)).pipe(
                    map(cts => cts.reduce((d, s) => d + s, 0))
                );
                const kkt = combineLatest(meals.map(m => m.totalKkal$)).pipe(
                    map(kkts => kkts.reduce((d, s) => d + s, 0))
                );
                const result = combineLatest([pt, ft, ct, kkt]).pipe(
                    map(([pto, fto, cto, kkto]) => {
                        const totals = new WholeDayNutrientTotals();
                        totals.proteinTotal = pto;
                        totals.fatTotal = fto;
                        totals.carbonTotal = cto;
                        totals.kkalTotal = kkto;
                        return totals;
                    })
                )
                return result;
            })
        )

        this.dayIndicator$ = combineLatest([this.dayTargets$, this.dayTotals$, this.totalKkal$]).pipe(
            map(([targets, totals, totalKk]) => {
                return ModelService.getDayIndicator(targets, totals, totalKk);
            })
        )
    }


    public id: string;
    public caption$: BehaviorSubject<string>;
    public totalKkal$: BehaviorSubject<number>;

    // lookups
    public ingredients$: Observable<Ingredient[]>;
    public dishes$: Observable<Dish[]>;
    public mealTypes$: Observable<MealType[]>;

    public meals$: BehaviorSubject<MealModel[]>;

    private dayTotals$: Observable<WholeDayNutrientTotals>;
    private dayTargets$: Observable<WholeDayNutrientTargetPercent>;
    public dayIndicator$: Observable<WholeDayNutrientIndicator>;

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