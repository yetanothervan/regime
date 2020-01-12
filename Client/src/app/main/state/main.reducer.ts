import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { MainActionTypes, MainActions } from './main.actions';
import { RationDay } from 'src/app/dtos/ration-day';
import { act } from '@ngrx/effects';

// state
export interface MainState {
    days: RationDay[];
}

export interface State extends fromRoot.State {
    main: MainState;
}

const initialState: MainState  = {
    days: []
};

// selectors
const getMainFeatureState = createFeatureSelector<MainState>('main');
export const getDays = createSelector(
    getMainFeatureState,
    state => state.days
);

// reducer

export function reducer(state = initialState, action: MainActions): MainState {
    switch (action.type) {
        case MainActionTypes.LoadSuccess: {
            const result: MainState = {
                ...state,
                days: action.payload
            };
            return result;
        }
        default:
            return state;
    }
}