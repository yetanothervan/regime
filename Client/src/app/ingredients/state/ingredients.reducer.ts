import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { IngredientsActionTypes, IngredientsActions } from './ingredients.actions';
import { Ingredient } from 'src/app/dtos/ingredient';

// state
export interface IngredientsState {
    ingredients: Ingredient[];
    filterString: string;
}

export interface State extends fromRoot.State {
    ingredients: IngredientsState;
}

const initialState: IngredientsState = {
    ingredients: [],
    filterString: ''
};

// selectors
const getIngredientsFeatureState = createFeatureSelector<IngredientsState>('ingredients');

export const getIngredients = createSelector(
    getIngredientsFeatureState,
    state => state.ingredients
);

export const getIngredientById = (id: string) => createSelector(
    getIngredients,
    ingredients => {
    if (id && ingredients && ingredients.length > 0) {
      return ingredients.find(item => {
        return item.id === id;
      });
    } else {
      return {
          caption: '',
          carbon100: 0,
          comment: '',
          fat100: 0,
          id: '',
          kkal100: 0,
          protein100: 0
      } as Ingredient;
    }
  });

export const getFilterString = createSelector(
    getIngredientsFeatureState,
    state => state.filterString
);

// reducer
export function reducer(state = initialState, action: IngredientsActions): IngredientsState {
    switch (action.type) {
        case IngredientsActionTypes.LoadSuccess: {
            const result: IngredientsState = {
                ...state,
                ingredients: action.payload
            };
            return result;
        }
        case IngredientsActionTypes.SetFilter: {
            const result: IngredientsState = {
                ...state,
                filterString: action.payload
            };
            return result;
        }
        case IngredientsActionTypes.UpdateSuccess: {
            const updatedIngredients = state.ingredients.map(
                i => action.payload.id === i.id ? action.payload : i);
            const result: IngredientsState = {
                ...state,
                ingredients: updatedIngredients
            };
            return result;
        }
        case IngredientsActionTypes.CreateSuccess: {
            const result: IngredientsState = {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
            return result;
        }
        default:
            return state;
    }
}
