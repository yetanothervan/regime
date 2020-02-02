import { createReducer, on, Action, combineReducers, ActionReducerMap } from '@ngrx/store';
import * as ingActions from './ingredients.actions';
import * as me from '.';
import { Sort } from '@angular/material/sort/typings/public-api';
import { Ingredient } from 'src/app/dtos/ingredient';

// state
export interface IngredientsState {
    filterString: string;
    sorting: Sort;
    // path save
    urlCurrent: string;
    idCurrent: string;
    // edited ingredient
    ingredientCurrent: Ingredient;
}

const newIngredient = { caption: '', carbon100: 0, fat100: 0, comment: '', id: '', kkal100: 0, protein100: 0 } as Ingredient;
const initialState: IngredientsState = {
    filterString: '',
    sorting: { active: '', direction: '' },
    // path save
    urlCurrent: me.allPath,
    idCurrent: '',
    // edited ingredient
    ingredientCurrent: newIngredient
};

// reducer

const ingredientsReducer = createReducer(
    initialState,
    on(ingActions.ingredientsSetFilter, (state: IngredientsState, { filterString }) => ({ ...state, filterString })),
    on(ingActions.ingredientsSetSorting, (state: IngredientsState, { sorting }) => ({ ...state, sorting })),
    on(ingActions.ingredientsPathAllNavigated, (state: IngredientsState) =>
        ({ ...state, urlCurrent: me.allPath, ingredientCurrent: newIngredient })),
    on(ingActions.ingredientsPathEditNavigated, (state: IngredientsState, { id }) =>
        ({ ...state, urlCurrent: me.editPath, idCurrent: id })),
    on(ingActions.ingredientsSetCurrentEditing, (state: IngredientsState, { ingredient }) =>
        ({ ...state, ingredientCurrent: ingredient })),
);

export function reducer(state: IngredientsState | undefined, action: Action) {
    return ingredientsReducer(state, action);
}
