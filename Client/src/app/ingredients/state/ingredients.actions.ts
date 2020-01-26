import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/dtos/ingredient';

export const ingredientsSetFilter = createAction('[Ingredients] SetFilter', props<{filterString: string}>());
export const ingredientsUpdate = createAction('[Ingredients] Update', props<{ingredient: Ingredient}>());
export const ingredientsCreate = createAction('[Ingredients] Create', props<{ingredient: Ingredient}>());
