import { Observable, BehaviorSubject, combineLatest, Subject, of } from 'rxjs';
import { map, mergeAll, mergeMap, share, withLatestFrom } from 'rxjs/operators';
import { Meal } from '../dtos/meal';
import { DayModel } from './day.model';
import { MealItemModel } from './meal-item.model';
import { MealType } from '../dtos/meal-type';

export class MealModel {
    constructor(meal: Meal, readonly day: DayModel) {
        this.id = meal.id;
        this.mealTypeId$ = new BehaviorSubject(meal.mealTypeId);
        this.mealType$ = this.mealTypeId$.pipe(
            withLatestFrom(day.mealTypes$),
            map(([mealTypeId, mealTypes]) => mealTypes.find(mt => mt.id === mealTypeId))
        );

        const mealItemArray = meal.mealItems.map(m => new MealItemModel(m.dishId, m.weight, this));
        this.mealItems$ = new BehaviorSubject(mealItemArray);

        this.totalKkal$ = this.mealItems$.asObservable().pipe(
            map((items) => Array.from(items, item => item.totalKkal$)),
            mergeMap((items2) =>
            {
                if (items2.length === 0) return of(0);
                return combineLatest(items2).pipe(map(tt2 => tt2.reduce((a, b) => a + b, 0)));
            })
        );

        this.totalProtein$ = this.mealItems$.asObservable().pipe(
            map((items) => Array.from(items, item => item.totalProtein$)),
            mergeMap((items2) => {
                if (items2.length === 0) return of(0);
                return combineLatest(items2)
                    .pipe(map(tt2 => tt2.reduce((a, b) => a + b, 0)));
            })
        );

        this.totalFat$ = this.mealItems$.asObservable().pipe(
            map((items) => Array.from(items, item => item.totalFat$)),
            mergeMap((items2) => {
                if (items2.length === 0) return of(0);
                return combineLatest(items2)
                    .pipe(map(tt2 => tt2.reduce((a, b) => a + b, 0)));
            })
        );
        this.totalCarbon$ = this.mealItems$.asObservable().pipe(
            map((items) => Array.from(items, item => item.totalCarbon$)),
            mergeMap((items2) => {
                if (items2.length === 0) return of(0);
                return combineLatest(items2)
                    .pipe(map(tt2 => tt2.reduce((a, b) => a + b, 0)));
            })
        );
    }
    public totalKkal$: Observable<number>;
    public totalProtein$: Observable<number>;
    public totalFat$: Observable<number>;
    public totalCarbon$: Observable<number>;
    public id: string;
    public mealTypeId$: BehaviorSubject<string>;
    public mealType$: Observable<MealType>;
    public mealItems$: BehaviorSubject<MealItemModel[]>;

    public addMeal() {
        this.mealItems$.next([...this.mealItems$.value, new MealItemModel('', 0, this)]);
    };
    public removeMeal(n: number) {
        const ms = this.mealItems$.value;
        ms.splice(n, 1);
        this.mealItems$.next(ms);
    };
}
