import { Dish } from 'src/app/dtos/dish';
import { DishItemExt } from './dish-item-ext';
import { Ingredient } from '../dtos/ingredient';

export class DishExt extends Dish {
    constructor(dish: Dish, ingredients: Ingredient[]) {
        super();
        Object.assign(this, dish);
        this.itemsExt = [];
        if (this.items && this.items.length
            && ingredients && ingredients.length) {
                this.items.forEach(element => {
                    const item = {...element};
                    const ing = ingredients.find(i => i.id === item.ingredientId);
                    this.itemsExt.push(new DishItemExt(item, ing));
                });
            }
    }

    public itemsExt: DishItemExt[];

    public get proteinPer(): number {
        return this.round(this.proteinTotal / this.getNutrientTotal());
    }

    public get carbonPer(): number {
        return this.round(this.carbonTotal / this.getNutrientTotal());
    }

    public get fatPer(): number {
        return this.round(this.fatTotal / this.getNutrientTotal());
    }

    public get proteinTotal(): number {
        return this.getNutrient(this.nameof<Ingredient>('protein100'));
    }

    public get carbonTotal(): number {
        return this.getNutrient(this.nameof<Ingredient>('carbon100'));
    }

    public get fatTotal(): number {
        return this.getNutrient(this.nameof<Ingredient>('fat100'));
    }

    public get kkalTotal(): number {
        return this.getNutrient(this.nameof<Ingredient>('kkal100'));
    }

    private getNutrientTotal(): number {
        return this.proteinTotal + this.fatTotal + this.carbonTotal;
    }

    private getNutrient(nutrient: string): number {
        return this.itemsExt.reduce((a, b) => a + (b.ingredient[nutrient] * b.weight) / 100, 0);
    }

    private nameof = <T>(name: Extract<keyof T, string>): string => name;

    private round(n: number): number {
        return Math.round((n + Number.EPSILON) * 100);
    }
}

export const makeDishExt = (dish: Dish, indredients: Ingredient[]) => new DishExt(dish, indredients);
