import { RationDay } from '../dtos/ration-day';
import { Ingredient } from '../dtos/ingredient';
import { Dish } from '../dtos/dish';
import { MealType } from '../dtos/meal-type';
import { MealExt } from './meal-ext';
import { ModelService } from './model.static';
import { WholeDayNutrientTotals } from './day-indicator.model';

export class RationDayExt extends RationDay {
    constructor(day: RationDay, ingredients: Ingredient[], dishes: Dish[], mealTypes: MealType[]) {
        super();
        Object.assign(this, day);
        const mealsExt: MealExt[] = [];
        if (day?.meals && ingredients && dishes && mealTypes) {
            day.meals.forEach(m => {
                const meal = new MealExt(m, ingredients, dishes, mealTypes);
                mealsExt.push(meal);
            });

            const totals = new WholeDayNutrientTotals();
            totals.kkalTotal = mealsExt.reduce((summ, add) => summ + add.kkTotal, 0);
            totals.proteinTotal = mealsExt.reduce((summ, add) => summ + add.proteinTotal, 0);
            totals.fatTotal = mealsExt.reduce((summ, add) => summ + add.fatTotal, 0);
            totals.carbonTotal = mealsExt.reduce((summ, add) => summ + add.carbonTotal, 0);

            const targets = ModelService.getDayTargets(mealsExt.map(m => m.mealType));
            const dayIndicator = ModelService.getDayIndicator(targets, totals, this.totalKkal);

            this.kkPercent = dayIndicator.kkPercent;
            this.kkClass = dayIndicator.kkClass;

            this.proteinClass = dayIndicator.proteinClass;
            this.fatClass = dayIndicator.fatClass;
            this.carbonClass = dayIndicator.carbonClass;
        }
    }

    public kkPercent: number;
    public kkClass: string;
    public proteinClass: string;
    public fatClass: string;
    public carbonClass: string;

    private round(n: number): number {
        return Math.round((n + Number.EPSILON) * 100);
    }
}