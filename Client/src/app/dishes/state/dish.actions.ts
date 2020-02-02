import { createAction, props } from '@ngrx/store';
import { Dish } from 'src/app/dtos/dish';

export const dishSetFilter = createAction('[Dish] SetFilter', props<{ filterString: string }>());
export const dishSetSorting =
    createAction('[Dish] SetSorting', props<{ sorting: { active: string, direction: string } }>());

export const dishUpdate = createAction('[Dish] Update', props<{ dish: Dish }>());
export const dishCreate = createAction('[Dish] Create', props<{ dish: Dish }>());

export const dishPathAllNavigated = createAction('[Dish] Navigated to All');
export const dishPathEditNavigated = createAction('[Dish] Navigated to Edit', props<{ id: string }>());
export const dishSetCurrentEditing = createAction('[Dish] SetCurrentEditing', props<{ dish: Dish }>());

export const dishEmptyAction = createAction('[Dish] Empty');
