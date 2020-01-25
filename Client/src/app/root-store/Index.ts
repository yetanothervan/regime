import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../app.state';
import { RootState } from './root-store.reducer';
export { RootState };
import * as RootActions from './root-store.actions';
import { Ingredient } from '../dtos/ingredient';
export { RootActions };

export interface State extends fromRoot.State {
    root: RootState;
}

// selectors
const getRootFeatureState = createFeatureSelector<RootState>('root');

//entities
export const getEntitiesDishes = createSelector(
    getRootFeatureState,
    state => state.dishes
);

export const getEntitiesIngredients = createSelector(
    getRootFeatureState,
    state => state.ingredients
);
export const getIngredientById = (id: string) => createSelector(
    getEntitiesIngredients,
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
