import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { IngredientsActionTypes, IngredientsActions } from './ingredients.actions';
import { Ingredient } from 'src/app/dtos/ingredient';

// state
export interface IngredientsState {
    ingredients: Ingredient[];
    filterString: string;
}

export interface State extends fromRoot.State {
    ingredients: IngredientsState;
}

const initialState: IngredientsState = {
    ingredients: [],
    filterString: ''
};

// selectors
const getIngredientsFeatureState = createFeatureSelector<IngredientsState>('ingredients');

export const getIngredients = createSelector(
    getIngredientsFeatureState,
    state => state.ingredients
);

export const getFilterString = createSelector(
    getIngredientsFeatureState,
    state => state.filterString
);

// reducer
export function reducer(state = initialState, action: IngredientsActions): IngredientsState {
    switch (action.type) {
        case IngredientsActionTypes.LoadSuccess: {
            const result: IngredientsState = {
                ...state,
                ingredients: action.payload
            };
            return result;
        }
        case IngredientsActionTypes.SetFilter: {
            const result: IngredientsState = {
                ...state,
                filterString: action.payload
            };
            return result;
        }
        default:
            return state;
    }
}
