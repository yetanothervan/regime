import { createAction, props } from '@ngrx/store';

import { TemplateDto } from 'src/app/dtos/tmp-dto';
// pfix TemplatePfix
// pfix templatePfix
// param templateParam

export const templatePfixSetFilter = createAction('[TemplatePfix] SetFilter', props<{ filterString: string }>());
export const templatePfixSetSorting =
    createAction('[TemplatePfix] SetSorting', props<{ sorting: { active: string, direction: string } }>());

export const templatePfixUpdate = createAction('[TemplatePfix] Update', props<{ templateParam: TemplateDto }>());
export const templatePfixCreate = createAction('[TemplatePfix] Create', props<{ templateParam: TemplateDto }>());

export const templatePfixPathAllNavigated = createAction('[TemplatePfix] Navigated to All');
export const templatePfixPathEditNavigated = createAction('[TemplatePfix] Navigated to Edit', props<{ id: string }>());
export const templatePfixSetCurrentEditing = createAction('[TemplatePfix] SetCurrentEditing', props<{ templateParam: TemplateDto }>());

export const templatePfixEmptyAction = createAction('[TemplatePfix] Empty');
