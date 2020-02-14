import * as root from 'src/app/root-store';
import * as me from '.';
import { createReducer, on, Action } from '@ngrx/store';
import { RationDay } from 'src/app/dtos/ration-day';
import { isRationDayEqual, copyRationDay } from 'src/app/dtos';
// state
export interface DaysState {
    deleteStatus: string;
    currentDayId: string;
    // edited
    dayCurrentMutable: RationDay;
}
const initDay = { id: '', meals: [], caption: '', totalKkal: 0 } as RationDay;
const initialState: DaysState = {
    deleteStatus: '',
    currentDayId: '',
    dayCurrentMutable: initDay
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
    on(me.DaysActions.daysSetCurrentEditing, (state: DaysState, { day }) => {
        if (isRationDayEqual(state.dayCurrentMutable, day)) {
            return { ...state };
        } else {
            return { ...state, dayCurrentMutable: copyRationDay(day), deleteStatus: '' };
        }
    })
);
export function reducer(state: DaysState | undefined, action: Action) {
    return daysReducer(state, action);
}