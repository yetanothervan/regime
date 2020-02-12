import * as rootActions from './root-store.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { Dish } from '../dtos/dish';
import { Ingredient } from '../dtos/ingredient';
import { TemplateDto } from '../dtos/tmp-dto';
import { MealType } from '../dtos/meal-type';
import { RationDay } from '../dtos/ration-day';

// state
export interface RootState {
    dishes: Dish[];
    ingredients: Ingredient[];
    template: TemplateDto[];
    mealTypes: MealType[];
    days: RationDay[];
}

const initialState: RootState = {
    dishes: [],
    ingredients: [],
    template: [],
    mealTypes: [],
    days: []
};

// reducer
const rootReducer = createReducer(
    initialState,
    on(rootActions.dishLoadSuccess, (state: RootState, { dishes }) => ({ ...state, dishes })),
    on(rootActions.dishUpdateSuccess, (state: RootState, { dish }) => {
        const updatedDishes = state.dishes.map(
            i => dish.id === i.id ? dish : i);
        const result: RootState = {
            ...state,
            dishes: updatedDishes
        };
        return result;
    }),
    on(rootActions.dishDeleteSuccess, (state: RootState, { id }) => {
        const leftDishes = state.dishes.filter(
            i => id !== i.id);
        const result: RootState = {
            ...state,
            dishes: leftDishes
        };
        return result;
    }),
    on(rootActions.dishCreateSuccess, (state: RootState, { dish }) =>
        ({ ...state, dishes: [...state.dishes, dish] })),
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
    on(rootActions.ingredientsDeleteSuccess, (state: RootState, { id }) => {
        const leftIngredients = state.ingredients.filter(
            i => id !== i.id);
        const result: RootState = {
            ...state,
            ingredients: leftIngredients
        };
        return result;
    }),
    on(rootActions.ingredientsCreateSuccess, (state: RootState, { ingredient }) =>
        ({ ...state, ingredients: [...state.ingredients, ingredient] })),

    on(rootActions.mealTypesLoadSuccess, (state: RootState, { mealTypes }) => ({ ...state, mealTypes })),
    on(rootActions.mealTypeUpdateSuccess, (state: RootState, { mealType }) => {
        const updatedMealTypes = state.mealTypes.map(
            i => mealType.id === i.id ? mealType : i);
        const result: RootState = {
            ...state,
            mealTypes: updatedMealTypes
        };
        return result;
    }),
    on(rootActions.mealTypeDeleteSuccess, (state: RootState, { id }) => {
        const leftMealTypes = state.mealTypes.filter(
            i => id !== i.id);
        const result: RootState = {
            ...state,
            mealTypes: leftMealTypes
        };
        return result;
    }),
    on(rootActions.mealTypeCreateSuccess, (state: RootState, { mealType }) =>
        ({ ...state, mealTypes: [...state.mealTypes, mealType] })),
    on(rootActions.daysLoadSuccess, (state: RootState, { days }) => ({ ...state, days })),
);

export function reducer(state: RootState | undefined, action: Action) {
    return rootReducer(state, action);
}

