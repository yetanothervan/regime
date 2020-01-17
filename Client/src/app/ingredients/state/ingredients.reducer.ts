import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { IngredientsActionTypes, IngredientsActions } from './ingredients.actions';
import { Ingredient } from 'src/app/dtos/ingredient';

// state
export interface IngredientsState {
    ingredients: Ingredient[];
}

export interface State extends fromRoot.State {
    ingredients: IngredientsState;
}

const initialState: IngredientsState = {
    ingredients: []
};

// selectors
const getIngredientsFeatureState = createFeatureSelector<IngredientsState>('ingredients');
export const getIngredients = createSelector(
    getIngredientsFeatureState,
    state => state.ingredients
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
        default:
            return state;
    }
}
