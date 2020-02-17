import * as root from 'src/app/root-store';
import * as me from '.';
import { createReducer, on, Action } from '@ngrx/store';
import { isRationDayEqual, copyRationDay } from 'src/app/dtos';

// state
export interface DaysState {
    deleteStatus: string;
    currentDayId: string;
    currentMealId: string;
}

const initialState: DaysState = {
    deleteStatus: '',
    currentDayId: '',
    currentMealId: ''
};
// reducer
const daysReducer = createReducer(
    initialState,
    on(me.DaysActions.dayDeleteFailed, (state: DaysState, { status }) =>
        ({ ...state, deleteStatus: status })),
    on(root.RootActions.dayDeleteSuccess, (state: DaysState, { id }) =>
        ({ ...state, deleteStatus: id })),
    on(me.DaysActions.daySelected, (state: DaysState, { id }) =>
        ({ ...state, currentDayId: id })),
    on(me.DaysActions.mealSelected, (state: DaysState, { id }) => ({ ...state, currentMealId: id })),
);
export function reducer(state: DaysState | undefined, action: Action) {
    return daysReducer(state, action);
}