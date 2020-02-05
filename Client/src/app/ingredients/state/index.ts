import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../app.state';
import * as IngActions from './ingredients.actions';
export { IngActions };
import { IngredientsState } from './ingredients.reducer';
export { IngredientsState };

export const ingredientsFeatureKey = 'ingredients';

export interface State extends fromRoot.State {
    [ingredientsFeatureKey]: IngredientsState;
}

// selectors
const getIngredientsFeatureState = createFeatureSelector<IngredientsState>(ingredientsFeatureKey);

export const getFilterString = createSelector(
    getIngredientsFeatureState,
    state => state.filterString
);

export const getSorting = createSelector(
    getIngredientsFeatureState,
    state => state.sorting
);

const getUrlCurrent = createSelector(
    getIngredientsFeatureState,
    state => state.urlCurrent
);
const getUrlId = createSelector(
    getIngredientsFeatureState,
    state => state.idCurrent
);
export const getUrlCurrenWithId = createSelector(
    getUrlCurrent,
    getUrlId,
    (url, id) => ({ url, id })
);
export const getIngredientCurrentMutable = createSelector(
    getIngredientsFeatureState,
    state => state.ingredientCurrentMutable
);
// various consts
export const allPath = 'all';
export const editPath = 'edit';
