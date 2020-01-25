import { createAction, props } from '@ngrx/store';
import { Dish } from '../dtos/dish';
import { Ingredient } from '../dtos/ingredient';

export const dishesLoad = createAction('[Root] Dishes Load');
export const dishesLoadSuccess = createAction('[Root] Dishes LoadSuccess', props<{ dishes: Dish[] }>());
export const dishesLoadFailed = createAction('[Root] Dishes LoadFailed');


export const ingredientsLoad = createAction('[Root] Ingredients Load');
export const ingredientsLoadSuccess = createAction('[Root] Ingredients LoadSuccess', props<{ ingredients: Ingredient[] }>());
export const ingredientsLoadFailed = createAction('[Root] Ingredients LoadFailed');
export const ingredientsUpdateSuccess = createAction('[Root] Ingredients UpdateSuccess', props<{ ingredient: Ingredient }>());
export const ingredientsCreateSuccess = createAction('[Root] Ingredients CreateSuccess', props<{ ingredient: Ingredient }>());
