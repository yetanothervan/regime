import { RootActions } from './root-store.actions';

// state
export interface RootState {
}

const initialState: RootState  = {
};

// reducer
export function reducer(state = initialState, action: RootActions): RootState {
    return state;
}
