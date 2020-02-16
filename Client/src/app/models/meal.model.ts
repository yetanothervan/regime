import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { Meal } from '../dtos/meal';
import { DayModel } from './day.model';
import { MealItemModel } from './meal-item.model';

export class MealModel {
    constructor(meal: Meal, readonly day: DayModel) {
        this.mealId = meal.id;
        this.mealTypeId = meal.mealTypeId;
        const mealItemArray = meal.mealItems.map(m => new MealItemModel(m.dishId, m.weight, this));
        this.mealItems$ = new BehaviorSubject(mealItemArray);
        this.totalKkal$ = this.mealItems$.pipe(
            map((items) => Array.from(items, item => item.totalKkal$.asObservable())),
            map((items2) => combineLatest(items2)
                .pipe(
                    map(tt2 => tt2.reduce((a, b) => a + b, 0)))), 
                    mergeAll()
                );
    }
    public totalKkal$: Observable<number>;
    public mealId: string;
    public mealTypeId: string;
    public mealItems$: BehaviorSubject<MealItemModel[]>;
}
