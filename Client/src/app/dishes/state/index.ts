import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../app.state';
import { DishesState } from './dishes.reducer';
export { DishesState };
import * as DishesActions from './dishes.actions';
export { DishesActions };

export interface State extends fromRoot.State {
    dishes: DishesState;
}

// selectors
const getDishesFeatureState = createFeatureSelector<DishesState>('dishes');

export const getFilterString = createSelector(
    getDishesFeatureState,
    state => state.filterString
);