import * as root from 'src/app/root-store';
import * as me from '.';
import { createReducer, on, Action } from '@ngrx/store';
import { RationDay } from 'src/app/dtos/ration-day';
import { isRationDayEqual, copyRationDay } from 'src/app/dtos';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
// state
export interface DaysState {
    deleteStatus: string;
    currentDayId: string;
    currentMealId: string;
    // edited
    dayCurrentMutable: RationDay;
    mealMutated: { mealId: string };
}
const initDay = { id: '', meals: [], caption: '', totalKkal: 0 } as RationDay;
const initialState: DaysState = {
    deleteStatus: '',
    currentDayId: '',
    currentMealId: '',
    dayCurrentMutable: initDay,
    mealMutated: { mealId: '' }
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
    on(me.DaysActions.daysSetCurrentEditing, (state: DaysState, { day }) => {
        if (isRationDayEqual(state.dayCurrentMutable, day)) {
            return { ...state };
        } else {
            return { ...state, dayCurrentMutable: copyRationDay(day), deleteStatus: '' };
        }
    }),
    on(me.DaysActions.daysMutableMutated, (state: DaysState) => ({ ...state, dayCurrentMutable: state.dayCurrentMutable })),
    on(me.DaysActions.mealMutableMutated, (state: DaysState, { mealId }) => ({ ...state, mealMutated: { mealId }})),
    on(me.DaysActions.mealSelected, (state: DaysState, { id }) => ({ ...state, currentMealId: id })),
);
export function reducer(state: DaysState | undefined, action: Action) {
    return daysReducer(state, action);
}