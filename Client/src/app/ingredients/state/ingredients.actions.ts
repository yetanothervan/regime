import { Action } from '@ngrx/store';

export enum IngredientsActionTypes {
    Load = '[Ingredients] Load',
    LoadSuccess = '[Ingredients] LoadSuccess',
    LoadFailed = '[Ingredients] LoadFailed'
}

export class Load implements Action {
    constructor() {}
    readonly type = IngredientsActionTypes.Load;
}

export class LoadSuccess implements Action {
    constructor() {}
    readonly type = IngredientsActionTypes.LoadSuccess;
}

export class LoadFailed implements Action {
    constructor() {}
    readonly type = IngredientsActionTypes.LoadFailed;
}

export type IngredientsActions = Load | LoadSuccess | LoadFailed;
