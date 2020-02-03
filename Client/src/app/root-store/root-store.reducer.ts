import * as rootActions from './root-store.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { Dish } from '../dtos/dish';
import { Ingredient } from '../dtos/ingredient';
import { TemplateDto } from '../dtos/tmp-dto';

// state
export interface RootState {
    dishes: Dish[];
    ingredients: Ingredient[];
    template: TemplateDto[];
}

const initialState: RootState = {
    dishes: [],
    ingredients: [],
    template: []
};

// reducer
const rootReducer = createReducer(
    initialState,
    on(rootActions.dishLoadSuccess, (state: RootState, { dish }) => ({ ...state, dish })),
    on(rootActions.dishUpdateSuccess, (state: RootState, { dish }) => {
        const updatedDishes = state.dishes.map(
            i => dish.id === i.id ? dish : i);
        const result: RootState = {
            ...state,
            dishes: updatedDishes
        };
        return result;
    }),
    on(rootActions.ingredientsCreateSuccess, (state: RootState, { ingredient }) =>
        ({ ...state, ingredients: [...state.ingredients, ingredient] })),
    on(rootActions.ingredientsLoadSuccess, (state: RootState, { ingredients }) => ({ ...state, ingredients })),
    on(rootActions.ingredientsUpdateSuccess, (state: RootState, { ingredient }) => {
        const updatedIngredients = state.ingredients.map(
            i => ingredient.id === i.id ? ingredient : i);
        const result: RootState = {
            ...state,
            ingredients: updatedIngredients
        };
        return result;
    }),
    on(rootActions.ingredientsCreateSuccess, (state: RootState, { ingredient }) =>
        ({ ...state, ingredients: [...state.ingredients, ingredient] }))
);

export function reducer(state: RootState | undefined, action: Action) {
    return rootReducer(state, action);
}

