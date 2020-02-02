import { createReducer, on, Action } from '@ngrx/store';
import * as templatePfixActions from './template.actions';
import * as me from '.';
import { Sort } from '@angular/material/sort/typings/public-api';

import { TemplateDto } from 'src/app/dtos/tmp-dto';
// pfix TemplatePfix
// pfix templatePfix
// param templateParam

// state
export interface TemplatePfixState {
    filterString: string;
    sorting: Sort;
    // path save
    urlCurrent: string;
    idCurrent: string;
    // edited templatePfix
    templateParamCurrent: TemplateDto;
}

const newTemplatePfix = { id: '', caption: '' } as TemplateDto;
const initialState: TemplatePfixState = {
    filterString: '',
    sorting: { active: '', direction: '' },
    // path save
    urlCurrent: me.allPath,
    idCurrent: '',
    // edited templateDto
    templateParamCurrent: newTemplatePfix
};

// reducer

const templatePfixReducer = createReducer(
    initialState,
    on(templatePfixActions.templatePfixSetFilter, (state: TemplatePfixState, { filterString }) => ({ ...state, filterString })),
    on(templatePfixActions.templatePfixSetSorting, (state: TemplatePfixState, { sorting }) => ({ ...state, sorting })),
    on(templatePfixActions.templatePfixPathAllNavigated, (state: TemplatePfixState) =>
        ({ ...state, urlCurrent: me.allPath, templateParamCurrent: newTemplatePfix })),
    on(templatePfixActions.templatePfixPathEditNavigated, (state: TemplatePfixState, { id }) =>
        ({ ...state, urlCurrent: me.editPath, idCurrent: id })),
    on(templatePfixActions.templatePfixSetCurrentEditing, (state: TemplatePfixState, { templateParam }) =>
        ({ ...state, templateParamCurrent: templateParam })),
);

export function reducer(state: TemplatePfixState | undefined, action: Action) {
    return templatePfixReducer(state, action);
}
