import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/dtos/ingredient';

export enum IngredientsActionTypes {
    Load = '[Ingredients] Load',
    LoadSuccess = '[Ingredients] LoadSuccess',
    LoadFailed = '[Ingredients] LoadFailed',
    SetFilter = '[Ingredients] SetFilter',
    Update = '[Ingredients] Update',
    UpdateSuccess = '[Ingredients] UpdateSuccess',
    UpdateFailed = '[Ingredients] UpdateFailed'
}

export class Load implements Action {
    constructor() { }
    readonly type = IngredientsActionTypes.Load;
}

export class LoadSuccess implements Action {
    constructor(public payload: Ingredient[]) {
    }
    readonly type = IngredientsActionTypes.LoadSuccess;
}

export class LoadFailed implements Action {
    constructor() { }
    readonly type = IngredientsActionTypes.LoadFailed;
}

export class SetFilter implements Action {
    constructor(public payload: string) { }
    readonly type = IngredientsActionTypes.SetFilter;
}

export class Update implements Action {
    constructor() { }
    readonly type = IngredientsActionTypes.Update;
}

export class UpdateSuccess implements Action {
    constructor() { }
    readonly type = IngredientsActionTypes.UpdateSuccess;
}

export class UpdateFailed implements Action {
    constructor() { }
    readonly type = IngredientsActionTypes.UpdateFailed;
}

export type IngredientsActions = Load | LoadSuccess | LoadFailed | SetFilter
    | Update | UpdateSuccess | UpdateFailed;
