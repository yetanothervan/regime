import { Action } from '@ngrx/store';
import { RationDay } from 'src/app/dtos/ration-day';

export enum MainActionTypes {
    Load = '[Main] Load',
    LoadSuccess = '[Main] LoadSuccess',
    LoadFailed = '[Main] LoadFailed'
}

export class Load implements Action {
    constructor() {}
    readonly type = MainActionTypes.Load;
}

export class LoadSuccess implements Action {
    constructor(public payload: RationDay[]) {}
    readonly type = MainActionTypes.LoadSuccess;
}

export class LoadFailed implements Action {
    constructor() {}
    readonly type = MainActionTypes.LoadFailed;
}

export type MainActions = Load | LoadSuccess | LoadFailed;
