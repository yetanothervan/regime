import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/dtos/ingredient';

export enum IngredientsActionTypes {
    Load = '[Ingredients] Load',
    LoadSuccess = '[Ingredients] LoadSuccess',
    LoadFailed = '[Ingredients] LoadFailed',
    SetFilter = '[Ingredients] SetFilter',
    Update = '[Ingredients] Update',
    UpdateSuccess = '[Ingredients] UpdateSuccess',
    UpdateFailed = '[Ingredients] UpdateFailed',
    Create = '[Ingredients] Create',
    CreateSuccess = '[Ingredients] CreateSuccess',
    CreateFailed = '[Ingredients] CreateFailed'
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
    constructor(public payload: Ingredient) { }
    readonly type = IngredientsActionTypes.Update;
}

export class UpdateSuccess implements Action {
    constructor(public payload: Ingredient) { }
    readonly type = IngredientsActionTypes.UpdateSuccess;
}

export class UpdateFailed implements Action {
    constructor() { }
    readonly type = IngredientsActionTypes.UpdateFailed;
}

export class Create implements Action {
    constructor(public payload: Ingredient) { }
    readonly type = IngredientsActionTypes.Create;
}

export class CreateSuccess implements Action {
    constructor(public payload: Ingredient) { }
    readonly type = IngredientsActionTypes.CreateSuccess;
}

export class CreateFailed implements Action {
    constructor() { }
    readonly type = IngredientsActionTypes.CreateFailed;
}

export type IngredientsActions = Load | LoadSuccess | LoadFailed | SetFilter
    | Update | UpdateSuccess | UpdateFailed
    | Create | CreateSuccess | CreateFailed;
