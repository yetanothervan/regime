import * as app from '../../app.state';
import { DaysState } from './days.reducer';
export { DaysState };
import * as DaysActions from './days.actions';
export { DaysActions };

export const daysFeatureKey = 'days';

export interface State extends app.State {
    [daysFeatureKey]: DaysState;
}