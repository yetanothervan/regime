import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as app from '../../app.state';
import * as fromRoot from 'src/app/root-store';
import { DishState } from './dish.reducer';
export { DishState };
import * as DishActions from './dish.actions';
export { DishActions };

export const dishFeatureKey = 'dish';

export interface State extends app.State {
    [dishFeatureKey]: DishState;
}

// selectors
const getDishFeatureState = createFeatureSelector<DishState>(dishFeatureKey);

export const getFilterString = createSelector(
    getDishFeatureState,
    state => state.filterString
);

export const getSorting = createSelector(
    getDishFeatureState,
    state => state.sorting
);

const getUrlCurrent = createSelector(
    getDishFeatureState,
    state => state.urlCurrent
);
const getUrlId = createSelector(
    getDishFeatureState,
    state => state.idCurrent
);
export const getUrlCurrenWithId = createSelector(
    getUrlCurrent,
    getUrlId,
    (url, id) => ({ url, id })
);
export const getDishCurrent = createSelector(
    getDishFeatureState,
    state => state.dishCurrent
);

export const getDishWithIngredients = createSelector(
    getDishCurrent,
    fromRoot.getEntitiesIngredients,
    (dishCur, ingredients) => ({dishCur, ingredients})
);

// various consts
export const allPath = 'all';
export const editPath = 'edit';
