import * as rootActions from './root-store.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { Dish } from '../dtos/dish';

// state
export interface RootState {
    dishes: Dish[];
}

const initialState: RootState = {
    dishes: []
};

// reducer
const rootReducer = createReducer(
    initialState,
    on(rootActions.dishesLoadSuccess, (state: RootState, { dishes }) => ({ ...state, dishes }))
);

export function reducer(state: RootState | undefined, action: Action) {
    return rootReducer(state, action);
}

