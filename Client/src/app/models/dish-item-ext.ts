import { DishItem } from '../dtos/dish-item';
import { Ingredient } from '../dtos/ingredient';

export class DishItemExt extends DishItem {
    constructor(item: DishItem, ing: Ingredient) {
        super();
        Object.assign(this, item);
        this.ingredient = ing;
    }
    ingredient: Ingredient;
}
