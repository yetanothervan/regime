import * as app from '../../app.state';
import { DaysState } from './days.reducer';
export { DaysState };
import * as DaysActions from './days.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { filter, mergeAll, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
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

export const getRationDayCurrentModel = createSelector(
    getDaysFeatureState,
    state => state.dayCurrentModel
);

export const getMealCurrentModel = createSelector(
    getRationDayCurrentModel,
    getCurrentMealId,
    (model, mealId) => {
        if (!model) return of(null);
        return model.meals$.asObservable().pipe(
            map(meals => meals.find(m => m.mealId === mealId))
        )
    });

export const getRationDayMealMutated = createSelector(
    getDaysFeatureState,
    state => state.mealMutated
);

export const getRationDayDeleteStatus = createSelector(
    getDaysFeatureState,
    state => state.deleteStatus
);

// various consts
export const allPath = 'all';
export const editPath = 'edit';

export const mealItemRowLevel = 'mealItemRowLevel';
export const mealFormLevel = 'mealFormLevel';
export const outerLevel = 'outerLevel';