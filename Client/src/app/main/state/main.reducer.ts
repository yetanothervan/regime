import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { MainActionTypes, MainActions } from './main.actions';

// state
export interface MainState {
    Toggled: boolean;
}

export interface State extends fromRoot.State {
    main: MainState;
}

const initialState: MainState  = {
    Toggled: true
};

// selectors
const getEditorFeatureState = createFeatureSelector<MainState>('main');
export const getToggled = createSelector(
    getEditorFeatureState,
    state => state.Toggled
);

// reducer

export function reducer(state = initialState, action: MainActions): MainState {
    switch (action.type) {
        case MainActionTypes.Load: {
            const result: MainState = {
                ...state
            };
            return result;
        }
        default:
            return state;
    }
}