import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../app.state';
import { RootState } from './root-store.reducer';

export interface State extends fromRoot.State {
    root: RootState;
}

// selectors
const getRootFeatureState = createFeatureSelector<RootState>('root');
