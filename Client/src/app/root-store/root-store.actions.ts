import { createAction, props } from '@ngrx/store';
import { Dish } from '../dtos/dish';
import { Ingredient } from '../dtos/ingredient';
import { TemplateDto } from '../dtos/tmp-dto';

export const dishLoad = createAction('[Root] Dishes Load');
export const dishLoadSuccess = createAction('[Root] Dishes LoadSuccess', props<{ dishes: Dish[] }>());
export const dishLoadFailed = createAction('[Root] Dishes LoadFailed');
export const dishUpdateSuccess = createAction('[Root] Dishes UpdateSuccess', props<{ dish: Dish }>());
export const dishCreateSuccess = createAction('[Root] Dishes CreateSuccess', props<{ dish: Dish }>());

export const ingredientsLoad = createAction('[Root] Ingredients Load');
export const ingredientsLoadSuccess = createAction('[Root] Ingredients LoadSuccess', props<{ ingredients: Ingredient[] }>());
export const ingredientsLoadFailed = createAction('[Root] Ingredients LoadFailed');
export const ingredientsUpdateSuccess = createAction('[Root] Ingredients UpdateSuccess', props<{ ingredient: Ingredient }>());
export const ingredientsCreateSuccess = createAction('[Root] Ingredients CreateSuccess', props<{ ingredient: Ingredient }>());

export const templatePfixLoad = createAction('[TemplatePfix] TemplatePfix Load');
export const templatePfixLoadSuccess = createAction('[TemplatePfix] TemplatePfix LoadSuccess', props<{ templateParam: TemplateDto[] }>());
export const templatePfixLoadFailed = createAction('[TemplatePfix] TemplatePfix LoadFailed');
export const templatePfixUpdateSuccess = createAction('[TemplatePfix] TemplatePfix UpdateSuccess', props<{ templateParam: TemplateDto }>());
export const templatePfixCreateSuccess = createAction('[TemplatePfix] TemplatePfix CreateSuccess', props<{ templateParam: TemplateDto }>());
