import { Dish } from './dish';
import * as _ from '../../../node_modules/lodash';

export const isDishEqual = ((a: Dish, b: Dish) => {
    if (a.caption !== b.caption
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
    }
    return true;
});

export const copyDish = ((a: Dish) => {
    const newDish = _.cloneDeep(a);
    return newDish;
});