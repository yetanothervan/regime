import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { DishesActionTypes, DishesActions } from './dishes.actions';

// state
export interface DishesState {
    Toggled: boolean;
}

export interface State extends fromRoot.State {
    dishes: DishesState;
}

const initialState: DishesState  = {
    Toggled: true
};

// selectors
const getEditorFeatureState = createFeatureSelector<DishesState>('dishes');
export const getToggled = createSelector(
    getEditorFeatureState,
    state => state.Toggled
);

// reducer

export function reducer(state = initialState, action: DishesActions): DishesState {
    switch (action.type) {
        case DishesActionTypes.Load: {
            const result: DishesState = {
                ...state
            };
            return result;
        }
        default:
            return state;
    }
}