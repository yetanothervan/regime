import { createReducer, on, Action } from '@ngrx/store';
import * as ingActions from './ingredients.actions';
import * as me from '.';

// state
export interface IngredientsState {
    filterString: string;
    // path save
    urlCurrent: string;
    idCurrent: string;
}

const initialState: IngredientsState = {
    filterString: '',
    // path save
    urlCurrent: me.allPath,
    idCurrent: ''
};

// reducer

const ingredientsReducer = createReducer(
    initialState,
    on(ingActions.ingredientsSetFilter, (state: IngredientsState, {filterString}) => ({ ...state, filterString })),
    on(ingActions.ingredientsPathAllNavigated, (state: IngredientsState) => ({ ...state, urlCurrent: me.allPath })),
    on(ingActions.ingredientsPathEditNavigated, (state: IngredientsState, {id}) => ({ ...state, urlCurrent: me.editPath, idCurrent: id })),
);

export function reducer(state: IngredientsState | undefined, action: Action) {
    return ingredientsReducer(state, action);
}
