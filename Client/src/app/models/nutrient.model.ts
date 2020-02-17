import { MealModel } from './meal.model';
import { MealType } from '../dtos/meal-type';
import { Observable, combineLatest } from 'rxjs';
import { map, share } from 'rxjs/operators';

export class NutrientModel {

    constructor(meal: MealModel, mealType: MealType) {
        this.kkPercent$ = meal.totalKkal$.pipe(
            map(kk => this.round(kk / mealType.kkalTotal))
        );

        const nutrientsTotal$ =
            combineLatest([meal.totalProtein$, meal.totalFat$, meal.totalCarbon$]).pipe(
                map(([p, f, c]) => p + f + c),
                share()
            );

        this.proteinPercent$ = combineLatest([meal.totalProtein$, nutrientsTotal$]).pipe(
            map(([p, n]) => this.round(p / n))
        );

        this.fatPercent$ = combineLatest([meal.totalFat$, nutrientsTotal$]).pipe(
            map(([f, n]) => this.round(f / n))
        );

        this.carbonPercent$ = combineLatest([meal.totalCarbon$, nutrientsTotal$]).pipe(
            map(([c, n]) => this.round(c / n))
        );
    }

    public kkPercent$: Observable<number>;
    public proteinPercent$: Observable<number>;
    public fatPercent$: Observable<number>;
    public carbonPercent$: Observable<number>;

    private round(n: number): number {
        return Math.round((n + Number.EPSILON) * 100);
    }
}