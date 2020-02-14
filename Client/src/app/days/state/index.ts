import * as app from '../../app.state';
import { DaysState } from './days.reducer';
export { DaysState };
import * as DaysActions from './days.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export { DaysActions };

export const daysFeatureKey = 'days';

export interface State extends app.State {
    [daysFeatureKey]: DaysState;
}

// selectors
const getDaysFeatureState = createFeatureSelector<DaysState>(daysFeatureKey);

export const getCurrentDayId = createSelector(
    getDaysFeatureState,
    state => state.currentDayId
);

export const getCurrentMealId = createSelector(
    getDaysFeatureState,
    state => state.currentMealId
);

export const getRationDayCurrentMutable = createSelector(
    getDaysFeatureState,
    state => state.dayCurrentMutable
);
export const getRationDayDeleteStatus = createSelector(
    getDaysFeatureState,
    state => state.deleteStatus
);
// various consts
export const allPath = 'all';
export const editPath = 'edit';