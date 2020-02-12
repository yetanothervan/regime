import * as root from 'src/app/root-store';
import * as me from '.';
import { createReducer, on, Action } from '@ngrx/store';
// state
export interface MealTypesState {
    deleteStatus: string;
}
const initialState: MealTypesState = {
    deleteStatus: ''
};
// reducer
const mealTypesReducer = createReducer(
    initialState,
    on(me.MealTypesActions.mealTypeDeleteFailed, (state: MealTypesState, { status }) =>
        ({ ...state, deleteStatus: status })),
    on(root.RootActions.mealTypeDeleteSuccess, (state: MealTypesState, { id }) =>
        ({ ...state, deleteStatus: id }))
);
export function reducer(state: MealTypesState | undefined, action: Action) {
    return mealTypesReducer(state, action);
}