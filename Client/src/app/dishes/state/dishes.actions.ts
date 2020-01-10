import { Action } from '@ngrx/store';

export enum DishesActionTypes {
    Load = '[Dishes] Load',
    LoadSuccess = '[Dishes] LoadSuccess',
    LoadFailed = '[Dishes] LoadFailed'
}

export class Load implements Action {
    constructor() {}
    readonly type = DishesActionTypes.Load;
}

export class LoadSuccess implements Action {
    constructor() {}
    readonly type = DishesActionTypes.LoadSuccess;
}

export class LoadFailed implements Action {
    constructor() {}
    readonly type = DishesActionTypes.LoadFailed;
}

export type DishesActions = Load | LoadSuccess | LoadFailed;
