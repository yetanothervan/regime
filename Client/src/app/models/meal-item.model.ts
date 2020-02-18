import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, share, multicast, refCount, shareReplay } from 'rxjs/operators';
import { DishExt } from './dish-ext';
import { MealModel } from './meal.model';

export class MealItemModel {
    constructor(dishId: string, weight: number, id: string, private _meal: MealModel) {

        this.dishId$ = new BehaviorSubject(dishId);
        this.weight$ = new BehaviorSubject(weight);
        this.id = id;

        const dishExt$ = combineLatest([
            _meal.day.dishes$,
            _meal.day.ingredients$,
            this.dishId$.asObservable()
        ]).pipe(
            map(([dishes, ingredients, myDishId]) => {
                const dish = dishes.find(d => d.id === myDishId);
                return new DishExt(dish, ingredients);
            }),
            shareReplay(1)
        );

        this.totalKkal$ = combineLatest([dishExt$,this.weight$.asObservable()]).pipe(
            map(([dishExt, myWeight]) => dishExt.kkalTotal * myWeight)
        );

        this.totalProtein$ = combineLatest([dishExt$,this.weight$.asObservable()]).pipe(
            map(([dishExt, myWeight]) => dishExt.proteinTotal * myWeight)
        );

        this.totalCarbon$ = combineLatest([dishExt$,this.weight$.asObservable()]).pipe(
            map(([dishExt, myWeight]) => dishExt.carbonTotal * myWeight)
        );

        this.totalFat$ = combineLatest([dishExt$,this.weight$.asObservable()]).pipe(
            map(([dishExt, myWeight]) => dishExt.fatTotal * myWeight)
        );
    }
    public id: string;
    public totalKkal$: Observable<number>;
    public totalProtein$: Observable<number>;
    public totalFat$: Observable<number>;
    public totalCarbon$: Observable<number>;
    dishId$: BehaviorSubject<string>;
    weight$: BehaviorSubject<number>;
}
