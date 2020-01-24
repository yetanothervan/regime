import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../app.state';
import { RootState } from './root-store.reducer';
export { RootState };
import * as RootActions from './root-store.actions';
export { RootActions };

export interface State extends fromRoot.State {
    root: RootState;
}

// selectors
const getRootFeatureState = createFeatureSelector<RootState>('root');
export const getEntitiesDishes = createSelector(
    getRootFeatureState,
    state => state.dishes
);
