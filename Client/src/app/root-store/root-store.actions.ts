import { Action } from '@ngrx/store';
import { Dish } from '../dtos/dish';

export enum RootStoreActionTypes {
    DishesLoad = '[Root] Dishes Load',
    DishesLoadSuccess = '[Root] Dishes LoadSuccess',
    DishesLoadFailed = '[Root] Dishes LoadFailed',
}

export class DishesLoad implements Action {
    constructor() {}
    readonly type = RootStoreActionTypes.DishesLoad;
}

export class DishesLoadSuccess implements Action {
    constructor(public payload: Dish[]) {}
    readonly type = RootStoreActionTypes.DishesLoadSuccess;
}

export class DishesLoadFailed implements Action {
    constructor() {}
    readonly type = RootStoreActionTypes.DishesLoadFailed;
}

export type RootActions = DishesLoad | DishesLoadSuccess | DishesLoadFailed;
