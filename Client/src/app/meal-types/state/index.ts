import * as app from '../../app.state';
import { MealTypesState } from './meal-types.reducer';
export { MealTypesState };
import * as MealTypesActions from './meal-types.actions';
export { MealTypesActions };

export const mealTypesFeatureKey = 'mealTypes';

export interface State extends app.State {
    [mealTypesFeatureKey]: MealTypesState;
}