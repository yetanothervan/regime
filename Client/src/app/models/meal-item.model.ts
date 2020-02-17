import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { DishExt } from './dish-ext';
import { MealModel } from './meal.model';

export class MealItemModel {
    constructor(dishId: string, weight: number, private _meal: MealModel) {
        this.dishId$ = new BehaviorSubject(dishId);
        this.weight$ = new BehaviorSubject(weight);
        this.totalKkal$ = combineLatest([
            _meal.day.dishes$,
            _meal.day.ingredients$,
            this.dishId$.asObservable(),
            this.weight$.asObservable()
        ]).pipe(
            map(([dishes, ingredients, myDishId, myWeight]) => {
                const dish = dishes.find(d => d.id === myDishId);
                const dishExt = new DishExt(dish, ingredients);
                return dishExt.kkalTotal * myWeight;
            })
        );
    }
    public totalKkal$: Observable<number>;
    dishId$: BehaviorSubject<string>;
    weight$: BehaviorSubject<number>;
}
