import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../app.state';
import { RootState } from './root-store.reducer';
export { RootState };
import * as RootActions from './root-store.actions';
import { Ingredient } from '../dtos/ingredient';
import { Dish } from '../dtos/dish';
import { TemplateDto } from '../dtos/tmp-dto';
export { RootActions };

export const rootFeatureKey = 'root';

export interface State extends fromRoot.State {
    [rootFeatureKey]: RootState;
}

// selectors
const getRootFeatureState = createFeatureSelector<RootState>(rootFeatureKey);

// entities
export const getEntitiesDishes = createSelector(
    getRootFeatureState,
    state => state.dishes
);
export const getDishById = (id: string) => createSelector(
  getEntitiesDishes,
  dishes => {
  if (id && dishes && dishes.length > 0) {
    return dishes.find(item => {
      return item.id === id;
    });
  } else {
    return {
      caption: '',
      category: '',
      comment: '',
      items: [],
      id: ''
    } as Dish;
  }
});

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

export const getEntitiesTemplatePfix = createSelector(
    getRootFeatureState,
    state => state.template
);
export const getTemplatePfixById = (id: string) => createSelector(
    getEntitiesTemplatePfix,
    tepmlatePfix => {
    if (id && tepmlatePfix && tepmlatePfix.length > 0) {
      return tepmlatePfix.find(item => {
        return item.id === id;
      });
    } else {
      return {
          caption: '',
          id: ''
      } as TemplateDto;
    }
  });
