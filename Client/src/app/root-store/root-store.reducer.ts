import * as rootActions from './root-store.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { Dish } from '../dtos/dish';
import { Ingredient } from '../dtos/ingredient';
import { act } from '@ngrx/effects';

// state
export interface RootState {
    dishes: Dish[];
    ingredients: Ingredient[];
}

const initialState: RootState = {
    dishes: [],
    ingredients: []
};

// reducer
const rootReducer = createReducer(
    initialState,
    on(rootActions.dishesLoadSuccess, (state: RootState, { dishes }) => ({ ...state, dishes })),
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

