import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { MainActionTypes, MainActions } from './main.actions';
import { RationDay } from 'src/app/dtos/ration-day';

// state
export interface MainState {
    days: RationDay[];
    selectedDay: string;
}

export interface State extends fromRoot.State {
    main: MainState;
}

const initialState: MainState  = {
    days: [],
    selectedDay: null
};

// selectors
const getMainFeatureState = createFeatureSelector<MainState>('main');
export const getDays = createSelector(
    getMainFeatureState,
    state => state.days
);

export const getSelectedDayId = createSelector(
    getMainFeatureState,
    state => state.selectedDay
);

export const getSelectedDay = createSelector(
    getMainFeatureState,
    getSelectedDayId,
    (state, dayId) => {
        return dayId ? state.days.find(d => d.id === dayId) : null;
    }
  );

// reducer

export function reducer(state = initialState, action: MainActions): MainState {
    switch (action.type) {
        case MainActionTypes.DaysLoadSuccess: {
            const result: MainState = {
                ...state,
                days: action.payload
            };
            return result;
        }
        case MainActionTypes.DaySelected: {
            const result: MainState = {
                ...state,
                selectedDay: action.payload
            };
            return result;
        }
        default:
            return state;
    }
}
