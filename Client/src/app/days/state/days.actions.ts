import { createAction, props } from '@ngrx/store';
import { RationDay } from 'src/app/dtos/ration-day';

export const dayUpdate = createAction('[Days] Update', props<{ day: RationDay }>());
export const dayCreate = createAction('[Days] Create', props<{ day: RationDay }>());
export const dayDelete = createAction('[Days] Delete', props<{ id: string }>());
export const dayDeleteFailed = createAction('[RationDay] DeleteFailed', props<{ status: string }>());
export const daySelected = createAction('[Days] Selected', props<{ id: string }>());
export const daysSetCurrentEditing = createAction('[Days] SetCurrentEditing', props<{ day: RationDay }>());
export const daysEmptyAction = createAction('[RationDay] Empty');
export const mealSelected = createAction('[Days] Meal Selected', props<{ id: string }>());
export const daysMutableMutated = createAction('[Days] Mutable Mutated', props<{ level: string }>());