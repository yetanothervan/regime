import { Meal } from '../dtos/meal';
import { Ingredient } from '../dtos/ingredient';
import { Dish } from '../dtos/dish';
import { MealType } from '../dtos/meal-type';
import { DishExt } from './dish-ext';

export class MealExt extends Meal {
    constructor(meal: Meal, ingredients: Ingredient[], dishes: Dish[], mealTypes: MealType[]) {
        super();
        Object.assign(this, meal);
        if (ingredients && dishes && meal && mealTypes) {
            const mealType = mealTypes.find(mt => mt.id === meal.mealTypeId);
            let kkTotal = 0;
            this.mealItems.forEach(mi => {
                const dish = dishes.find(d => d.id === mi.dishId);
                const dishExt = new DishExt(dish, ingredients);
                kkTotal += (dishExt.kkalTotal) * mi.weight;
            });
            this.kkPercent = this.round(kkTotal / mealType.kkalTotal);
            this.kkWidth = this.kkPercent > 100 ? 100 : this.kkPercent;
        }
    }

    public kkPercent: number;
    public kkWidth: number;

    private round(n: number): number {
        return Math.round((n + Number.EPSILON) * 100);
    }
}

export const makeDishExt = (dish: Dish, indredients: Ingredient[]) => new DishExt(dish, indredients);
