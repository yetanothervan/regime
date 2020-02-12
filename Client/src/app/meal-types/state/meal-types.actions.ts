import { MealType } from 'src/app/dtos/meal-type';
import { props, createAction } from '@ngrx/store';

export const mealTypeUpdate = createAction('[MealTypes] Update', props<{ mealType: MealType }>());
export const mealTypeCreate = createAction('[MealTypes] Create', props<{ mealType: MealType }>());
export const mealTypeDelete = createAction('[MealTypes] Delete', props<{ id: string }>());
export const mealTypeDeleteFailed = createAction('[MealTypes] DeleteFailed', props<{ status: string }>());