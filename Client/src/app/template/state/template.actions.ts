import { createAction, props } from '@ngrx/store';

import { TemplateDto } from 'src/app/dtos/tmp-dto';
// prefix TemplatePrefix
// prefix templatePrefix
// postfix TemplatePostfix
// postfix template-postfix
// param templateParam

export const templatePrefixSetFilter = createAction('[TemplatePrefix] SetFilter', props<{ filterString: string }>());
export const templatePrefixSetSorting =
    createAction('[TemplatePrefix] SetSorting', props<{ sorting: { active: string, direction: string } }>());

export const templatePrefixUpdate = createAction('[TemplatePrefix] Update', props<{ templateParam: TemplateDto }>());
export const templatePrefixCreate = createAction('[TemplatePrefix] Create', props<{ templateParam: TemplateDto }>());

export const templatePrefixPathAllNavigated = createAction('[TemplatePrefix] Navigated to All');
export const templatePrefixPathEditNavigated = createAction('[TemplatePrefix] Navigated to Edit', props<{ id: string }>());
export const templatePrefixSetCurrentEditing = createAction('[TemplatePrefix] SetCurrentEditing', props<{ templateParam: TemplateDto }>());

export const templatePrefixEmptyAction = createAction('[TemplatePrefix] Empty');
