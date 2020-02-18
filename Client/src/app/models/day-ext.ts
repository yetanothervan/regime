import { RationDay } from '../dtos/ration-day';
import { Ingredient } from '../dtos/ingredient';
import { Dish } from '../dtos/dish';
import { MealType } from '../dtos/meal-type';
import { MealExt } from './meal-ext';
import { ModelService } from './model.static';

export class RationDayExt extends RationDay {
    constructor(day: RationDay, ingredients: Ingredient[], dishes: Dish[], mealTypes: MealType[] ) {
        super();
        Object.assign(this, day);
        const mealsExt: MealExt[] = [];
        if (day?.meals && ingredients && dishes && mealTypes)
        {
            day.meals.forEach(m => {
                const meal = new MealExt(m, ingredients, dishes, mealTypes);
                mealsExt.push(meal);
            });
            const kkTotal = mealsExt.reduce((summ, add) => summ + add.kkTotal, 0);
            this.kkPercent = this.totalKkal ? this.round(kkTotal / this.totalKkal) : 0;
            this.kkClass = ModelService.getClass(
                ModelService.getPercentageClass(this.kkPercent)
            );
        }
        const proteinClassNumber = mealsExt.reduce((d, s) => Math.min(d, s.proteinClass), 4);
        this.proteinClass = ModelService.getClass(proteinClassNumber);
        const fatClassNumber = mealsExt.reduce((d, s) => Math.min(d, s.fatClass), 4);
        this.fatClass = ModelService.getClass(fatClassNumber);
        const carbonClassNumber = mealsExt.reduce((d, s) => Math.min(d, s.carbonClass), 4);
        this.carbonClass = ModelService.getClass(carbonClassNumber);
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