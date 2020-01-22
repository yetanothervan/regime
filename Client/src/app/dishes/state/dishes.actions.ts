import { Action } from '@ngrx/store';
import { Dish } from 'src/app/dtos/dish';

export enum DishesActionTypes {
    Load = '[Dishes] Load',
    LoadSuccess = '[Dishes] LoadSuccess',
    LoadFailed = '[Dishes] LoadFailed',
    SetFilter = '[Dishes] SetFilter',
}

export class Load implements Action {
    constructor() {}
    readonly type = DishesActionTypes.Load;
}

export class LoadSuccess implements Action {
    constructor(public payload: Dish[]) {}
    readonly type = DishesActionTypes.LoadSuccess;
}

export class LoadFailed implements Action {
    constructor() {}
    readonly type = DishesActionTypes.LoadFailed;
}

export class SetFilter implements Action {
    constructor(public payload: string) { }
    readonly type = DishesActionTypes.SetFilter;
}

export type DishesActions = Load | LoadSuccess | LoadFailed | SetFilter;
