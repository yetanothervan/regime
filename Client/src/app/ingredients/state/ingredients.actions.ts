import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/dtos/ingredient';

export const ingredientsSetFilter = createAction('[Ingredients] SetFilter', props<{filterString: string}>());
export const ingredientsUpdate = createAction('[Ingredients] Update', props<{ingredient: Ingredient}>());
export const ingredientsUpdateSuccess = createAction('[Ingredients] UpdateSuccess', props<{ingredient: Ingredient}>());
export const ingredientsUpdateFailed = createAction('[Ingredients] UpdateFailed', props<{error: string}>());
export const ingredientsCreate = createAction('[Ingredients] Create', props<{ingredient: Ingredient}>());
export const ingredientsCreateSuccess = createAction('[Ingredients] CreateSuccess', props<{ingredient: Ingredient}>());
export const ingredientsCreateFailed = createAction('[Ingredients] CreateFailed', props<{error: string}>());
