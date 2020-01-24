import { Action } from '@ngrx/store';

export enum DishesActionTypes {
    SetFilter = '[Dishes] SetFilter',
}

export class SetFilter implements Action {
    constructor(public payload: string) { }
    readonly type = DishesActionTypes.SetFilter;
}

export type DishesActions = SetFilter;
