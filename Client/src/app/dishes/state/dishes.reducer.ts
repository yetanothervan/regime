import { createReducer, on, Action } from '@ngrx/store';
import * as dishesActions from './dishes.actions';

// state
export interface DishesState {
    filterString: string;
}

const initialState: DishesState  = {
    filterString: ''
};

// reducer

const dishesReducer = createReducer(
    initialState,
    on(dishesActions.dishesSetFilter, (state: DishesState, {filterString}) => ({ ...state, filterString }))
);

export function reducer(state: DishesState | undefined, action: Action) {
    return dishesReducer(state, action);
}
