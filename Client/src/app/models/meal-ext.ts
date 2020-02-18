import { Meal } from '../dtos/meal';
import { Ingredient } from '../dtos/ingredient';
import { Dish } from '../dtos/dish';
import { MealType } from '../dtos/meal-type';
import { DishExt } from './dish-ext';
import { ModelService } from './model.static';

export class MealExt extends Meal {
    constructor(meal: Meal, ingredients: Ingredient[], dishes: Dish[], mealTypes: MealType[]) {
        super();
        Object.assign(this, meal);
        if (ingredients && dishes && meal && mealTypes) {
            const mealType = mealTypes.find(mt => mt.id === meal.mealTypeId);
            if (!mealType) return;
            this.kkTotal = 0;
            let nutrientsTotal = 0;
            let proteinTotal = 0;
            let fatTotal = 0;
            let carbonTotal = 0;
            this.mealItems.forEach(mi => {
                const dish = dishes.find(d => d.id === mi.dishId);
                const dishExt = new DishExt(dish, ingredients);
                this.kkTotal += (dishExt.kkalTotal) * mi.weight;
                nutrientsTotal += dishExt.nutrientsTotal * mi.weight;
                proteinTotal += dishExt.proteinTotal * mi.weight;
                fatTotal += dishExt.fatTotal * mi.weight;
                carbonTotal += dishExt.carbonTotal * mi.weight;
            });
            this.kkPercent = this.round(this.kkTotal / mealType.kkalTotal);
            const proteinPercent = this.getPart(proteinTotal, nutrientsTotal);
            const proteinPercentNorm = this.getPart(proteinPercent, mealType.proteinPart);
            this.proteinClass = ModelService.getPercentageClass(proteinPercentNorm);

            const fatPercent = this.getPart(fatTotal, nutrientsTotal);
            const fatPercentNorm = this.getPart(fatPercent, mealType.fatPart);
            this.fatClass = ModelService.getPercentageClass(fatPercentNorm);

            const carbonPercent = this.getPart(carbonTotal, nutrientsTotal);
            const carbonPercentNorm = this.getPart(carbonPercent, mealType.carbonPart);
            this.carbonClass = ModelService.getPercentageClass(carbonPercentNorm);

            this.kkWidth = this.kkPercent > 100 ? 100 : this.kkPercent;
        }
    }

    public kkPercent: number;
    public kkWidth: number;
    public kkTotal: number;
    public proteinClass: number;
    public fatClass: number;
    public carbonClass: number;

    private round(n: number): number {
        return Math.round((n + Number.EPSILON) * 100);
    }

    private getPart(n: number, part: number) {
        if (!n || !part) return 0;
        return this.round(n / part);
      }
}

export const makeDishExt = (dish: Dish, indredients: Ingredient[]) => new DishExt(dish, indredients);
