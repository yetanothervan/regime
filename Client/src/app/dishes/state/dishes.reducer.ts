import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { DishesActionTypes, DishesActions } from './dishes.actions';
import { Dish } from 'src/app/dtos/dish';

// state
export interface DishesState {
    dishes: Dish[];
    filterString: string;
}

export interface State extends fromRoot.State {
    dishes: DishesState;
}

const initialState: DishesState  = {
    dishes: [],
    filterString: ''
};

// selectors
const getDishesFeatureState = createFeatureSelector<DishesState>('dishes');

export const getDishes = createSelector(
    getDishesFeatureState,
    state => state.dishes
);

export const getFilterString = createSelector(
    getDishesFeatureState,
    state => state.filterString
);

// reducer

export function reducer(state = initialState, action: DishesActions): DishesState {
    switch (action.type) {
        case DishesActionTypes.LoadSuccess: {
            const result: DishesState = {
                ...state,
                dishes: action.payload
            };
            return result;
        }
        case DishesActionTypes.SetFilter: {
            const result: DishesState = {
                ...state,
                filterString: action.payload
            };
            return result;
        }
        default:
            return state;
    }
}