import { createReducer, on, Action } from '@ngrx/store';
import * as ingActions from './ingredients.actions';

// state
export interface IngredientsState {
    filterString: string;
}

const initialState: IngredientsState = {
    filterString: ''
};

// reducer

const ingredientsReducer = createReducer(
    initialState,
    on(ingActions.ingredientsSetFilter, (state: IngredientsState, {filterString}) => ({ ...state, filterString }))
);

export function reducer(state: IngredientsState | undefined, action: Action) {
    return ingredientsReducer(state, action);
}
