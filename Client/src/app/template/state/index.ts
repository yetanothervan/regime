import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../app.state';
import { TemplatePfixState } from './template.reducer';
export { TemplatePfixState };
import * as TemplateActions from './template.actions';
export { TemplateActions };

// pfix TemplatePfix
// pfix templatePfix
// param templateParam

export const templatePfixFeatureKey = 'templatePfix';

export interface State extends fromRoot.State {
    [templatePfixFeatureKey]: TemplatePfixState;
}

// selectors
const getTemplatePfixFeatureState = createFeatureSelector<TemplatePfixState>(templatePfixFeatureKey);

export const getFilterString = createSelector(
    getTemplatePfixFeatureState,
    state => state.filterString
);

export const getSorting = createSelector(
    getTemplatePfixFeatureState,
    state => state.sorting
);

const getUrlCurrent = createSelector(
    getTemplatePfixFeatureState,
    state => state.urlCurrent
);
const getUrlId = createSelector(
    getTemplatePfixFeatureState,
    state => state.idCurrent
);
export const getUrlCurrenWithId = createSelector(
    getUrlCurrent,
    getUrlId,
    (url, id) => ({ url, id })
);
export const getTemplatePfixCurrent = createSelector(
    getTemplatePfixFeatureState,
    state => state.templateParamCurrent
);
// various consts
export const allPath = 'all';
export const editPath = 'edit';
