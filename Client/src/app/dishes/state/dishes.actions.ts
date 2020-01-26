import { createAction, props } from '@ngrx/store';
import { Dish } from 'src/app/dtos/dish';

export const dishesSetFilter = createAction('[Dishes] SetFilter', props<{filterString: string}>());
export const dishesUpdate = createAction('[Dishes] Update', props<{dish: Dish}>());
export const dishesCreate = createAction('[Dishes] Create', props<{dish: Dish}>());
