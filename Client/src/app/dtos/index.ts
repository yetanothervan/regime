import { v4 as uuid } from 'uuid';
import { Dish } from './dish';
import * as _ from '../../../node_modules/lodash';
import { Ingredient } from './ingredient';
import { MealType } from './meal-type';
import { RationDay } from './ration-day';
import { Meal } from './meal';

export const isDishEqual = ((a: Dish, b: Dish) => {
    return _.isEqual(a, b);
    /* if (a.caption !== b.caption
        || a.category !== b.category
        || a.comment !== b.comment
        || a.id !== b.id
        || a.items && b.items && a.items.length !== b.items.length) {
        return false;
    }
    for (let i = a.items.length; i--;) {
        const ai = a.items[i];
        const bi = b.items[i];
        if (ai.ingredientId !== bi.ingredientId
            || ai.weight !== bi.weight) {
            return false;
        }
    }*/
    return true;
});

export const copyDish = ((a: Dish) => {
    const newDish = _.cloneDeep(a);
    return newDish;
});

export const isIngredientEqual = ((a: Ingredient, b: Ingredient) => {
    return _.isEqual(a, b);
});

export const copyIngredient = ((a: Ingredient) => {
    const newIngredient = _.cloneDeep(a);
    return newIngredient;
});

export const copyMealType = ((a: MealType) => {
    const newMealType = _.cloneDeep(a);
    return newMealType;
});
export const isMealTypeEqual = ((a: MealType, b: MealType) => {
    return _.isEqual(a, b);
});
export const newMeal = (): Meal => {
    return { mealTypeId: '', id: uuid(), mealItems: [] } as Meal;
}

export const copyRationDay = ((a: RationDay) => {
    const newRationDay = _.cloneDeep(a);
    return newRationDay;
});
export const isRationDayEqual = ((a: RationDay, b: RationDay) => {
    return _.isEqual(a, b);
});