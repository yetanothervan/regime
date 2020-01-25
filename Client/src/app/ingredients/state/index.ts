import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../app.state';
import * as IngActions from './ingredients.actions';
export { IngActions };
import { IngredientsState } from './ingredients.reducer';
export { IngredientsState };

export interface State extends fromRoot.State {
    ingredients: IngredientsState;
}

// selectors
const getIngredientsFeatureState = createFeatureSelector<IngredientsState>('ingredients');

export const getFilterString = createSelector(
    getIngredientsFeatureState,
    state => state.filterString
);