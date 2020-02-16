import { BehaviorSubject, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DishExt } from './dish-ext';
import { MealModel } from './meal.model';

export class MealItemModel {
    constructor(dishId: string, weight: number, private _meal: MealModel) {
        this.dishId$ = new BehaviorSubject(dishId);
        this.weight$ = new BehaviorSubject(weight);
        this.totalKkal$ = new BehaviorSubject(0);
        combineLatest([
            _meal.day.dishes$,
            _meal.day.ingredients$,
            this.dishId$.asObservable(),
            this.weight$.asObservable()
        ]).pipe(tap(([dishes, ingredients, myDishId, myWeight]) => {
            const dish = dishes.find(d => d.id === myDishId);
            const dishExt = new DishExt(dish, ingredients);
            this.totalKkal$.next(dishExt.kkalTotal * myWeight);
        }));
    }
    public totalKkal$: BehaviorSubject<number>;
    dishId$: BehaviorSubject<string>;
    weight$: BehaviorSubject<number>;
}
