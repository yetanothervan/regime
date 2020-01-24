import { createAction, props } from '@ngrx/store';
import { Dish } from '../dtos/dish';

export const dishesLoad = createAction('[Root] Dishes Load');
export const dishesLoadSuccess = createAction('[Root] Dishes LoadSuccess', props<{ dishes: Dish[] }>());
export const dishesLoadFailed = createAction('[Root] Dishes LoadFailed');
