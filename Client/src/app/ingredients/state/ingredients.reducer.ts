import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { IngredientsActionTypes, IngredientsActions } from './ingredients.actions';

// state
export interface IngredientsState {
    Toggled: boolean;
}

export interface State extends fromRoot.State {
    ingredients: IngredientsState;
}

const initialState: IngredientsState  = {
    Toggled: true
};

// selectors
const getEditorFeatureState = createFeatureSelector<IngredientsState>('ingredients');
export const getToggled = createSelector(
    getEditorFeatureState,
    state => state.Toggled
);

// reducer

export function reducer(state = initialState, action: IngredientsActions): IngredientsState {
    switch (action.type) {
        case IngredientsActionTypes.Load: {
            const result: IngredientsState = {
                ...state
            };
            return result;
        }
        default:
            return state;
    }
}