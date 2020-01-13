import { Action } from '@ngrx/store';
import { RationDay } from 'src/app/dtos/ration-day';

export enum MainActionTypes {
    DaysLoad = '[Main] Days Load',
    DaysLoadSuccess = '[Main] Days LoadSuccess',
    DaysLoadFailed = '[Main] Days LoadFailed',
    DaySelected = '[Main] Days Selected'
}

export class Load implements Action {
    constructor() {}
    readonly type = MainActionTypes.DaysLoad;
}

export class LoadSuccess implements Action {
    constructor(public payload: RationDay[]) {}
    readonly type = MainActionTypes.DaysLoadSuccess;
}

export class LoadFailed implements Action {
    constructor() {}
    readonly type = MainActionTypes.DaysLoadFailed;
}

export class DaySelected implements Action {
    constructor(public payload: string) {}
    readonly type = MainActionTypes.DaySelected;
}

export type MainActions = Load | LoadSuccess | LoadFailed | DaySelected;
