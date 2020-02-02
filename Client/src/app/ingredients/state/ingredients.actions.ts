import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/dtos/ingredient';

export const ingredientsSetFilter = createAction('[Ingredients] SetFilter', props<{ filterString: string }>());
export const ingredientsSetSorting = createAction('[Ingredients] SetSorting', props<{ sorting: { active: string, direction: string } }>());

export const ingredientsUpdate = createAction('[Ingredients] Update', props<{ ingredient: Ingredient }>());
export const ingredientsCreate = createAction('[Ingredients] Create', props<{ ingredient: Ingredient }>());

export const ingredientsPathAllNavigated = createAction('[Ingredients] Navigated to All');
export const ingredientsPathEditNavigated = createAction('[Ingredients] Navigated to Edit', props<{ id: string }>());
export const ingredientsSetCurrentEditing = createAction('[Ingredient] StartEditing', props<{ ingredient: Ingredient }>());

export const ingredientsEmptyAction = createAction('[Ingredient] Empty');
