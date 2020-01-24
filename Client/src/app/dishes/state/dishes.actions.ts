import { createAction, props } from '@ngrx/store';

export const dishesSetFilter = createAction('[Dishes] SetFilter', props<{filterString: string}>());

