import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, mergeAll, mergeMap, share } from 'rxjs/operators';
import { Meal } from '../dtos/meal';
import { DayModel } from './day.model';
import { MealItemModel } from './meal-item.model';

export class MealModel {
    constructor(meal: Meal, readonly day: DayModel) {
        this.mealId = meal.id;
        this.mealTypeId = meal.mealTypeId;
        const mealItemArray = meal.mealItems.map(m => new MealItemModel(m.dishId, m.weight, this));
        this.mealItems$ = new BehaviorSubject(mealItemArray);

        this.totalKkal$ = this.mealItems$.asObservable().pipe(
            map((items) => Array.from(items, item => item.totalKkal$)),
            mergeMap((items2) => combineLatest(items2)
                .pipe(map(tt2 => tt2.reduce((a, b) => a + b, 0))))
        );

        this.totalProtein$ = this.mealItems$.asObservable().pipe(
            map((items) => Array.from(items, item => item.totalProtein$)),
            mergeMap((items2) => combineLatest(items2)
                .pipe(map(tt2 => tt2.reduce((a, b) => a + b, 0))))
        );

        this.totalFat$ = this.mealItems$.asObservable().pipe(
            map((items) => Array.from(items, item => item.totalFat$)),
            mergeMap((items2) => combineLatest(items2)
                .pipe(map(tt2 => tt2.reduce((a, b) => a + b, 0))))
        );
        this.totalCarbon$ = this.mealItems$.asObservable().pipe(
            map((items) => Array.from(items, item => item.totalCarbon$)),
            mergeMap((items2) => combineLatest(items2)
                .pipe(map(tt2 => tt2.reduce((a, b) => a + b, 0))))
        );
    }
    public totalKkal$: Observable<number>;
    public totalProtein$: Observable<number>;
    public totalFat$: Observable<number>;
    public totalCarbon$: Observable<number>;
    public mealId: string;
    public mealTypeId: string;
    public mealItems$: BehaviorSubject<MealItemModel[]>;
}
