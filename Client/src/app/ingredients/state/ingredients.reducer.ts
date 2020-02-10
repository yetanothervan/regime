import { createReducer, on, Action, combineReducers, ActionReducerMap } from '@ngrx/store';
import * as me from '.';
import * as root from 'src/app/root-store';
import { Sort } from '@angular/material/sort/public-api';
import { Ingredient } from 'src/app/dtos/ingredient';
import { isIngredientEqual, copyIngredient } from 'src/app/dtos';

// state
export interface IngredientsState {
    filterString: string;
    sorting: Sort;
    // path save
    urlCurrent: string;
    idCurrent: string;
    // edited ingredient
    ingredientCurrentMutable: Ingredient;
    // statuses
    deleteStatus: string;
}

const newIngredient = { caption: '', carbon100: 0, fat100: 0, comment: '', id: '', kkal100: 0, protein100: 0 } as Ingredient;
const initialState: IngredientsState = {
    filterString: '',
    sorting: { active: '', direction: '' },
    // path save
    urlCurrent: me.allPath,
    idCurrent: '',
    // edited ingredient
    ingredientCurrentMutable: newIngredient,
    // statuses
    deleteStatus: ''
};

// reducer

const ingredientsReducer = createReducer(
    initialState,
    on(me.IngActions.ingredientsSetFilter, (state: IngredientsState, { filterString }) => ({ ...state, filterString })),
    on(me.IngActions.ingredientsSetSorting, (state: IngredientsState, { sorting }) => ({ ...state, sorting })),
    on(me.IngActions.ingredientsPathAllNavigated, (state: IngredientsState) =>
        ({ ...state, urlCurrent: me.allPath, ingredientCurrent: newIngredient, deleteStatus: '' })),
    on(me.IngActions.ingredientsPathEditNavigated, (state: IngredientsState, { id }) =>
        ({ ...state, urlCurrent: me.editPath, idCurrent: id })),
    on(me.IngActions.ingredientsSetCurrentEditing, (state: IngredientsState, { ingredient }) => {
        if (isIngredientEqual(state.ingredientCurrentMutable, ingredient)) {
            return { ...state };
        } else {
            return { ...state, ingredientCurrentMutable: copyIngredient(ingredient), deleteStatus: '' };
        }
    }),
    on(me.IngActions.ingredientsDeleteFailed, (state: IngredientsState, { status }) =>
        ({ ...state, deleteStatus: status })),
    on(root.RootActions.ingredientsDeleteSuccess, (state: IngredientsState, { id }) =>
        ({ ...state, deleteStatus: id }))
);

export function reducer(state: IngredientsState | undefined, action: Action) {
    return ingredientsReducer(state, action);
}
