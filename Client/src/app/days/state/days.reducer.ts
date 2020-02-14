import * as root from 'src/app/root-store';
import * as me from '.';
import { createReducer, on, Action } from '@ngrx/store';
// state
export interface DaysState {
    deleteStatus: string;
    currentDayId: string;
}
const initialState: DaysState = {
    deleteStatus: '',
    currentDayId: ''
};
// reducer
const daysReducer = createReducer(
    initialState,
    on(me.DaysActions.dayDeleteFailed, (state: DaysState, { status }) =>
        ({ ...state, deleteStatus: status })),
    on(root.RootActions.dayDeleteSuccess, (state: DaysState, { id }) =>
        ({ ...state, deleteStatus: id })),
    on(root.RootActions.dayCreateSuccess, (state: DaysState, { day }) =>
        ({ ...state, currentDayId: day.id })),
    on(me.DaysActions.daySelected, (state: DaysState, { id }) =>
        ({ ...state, currentDayId: id })),
);
export function reducer(state: DaysState | undefined, action: Action) {
    return daysReducer(state, action);
}