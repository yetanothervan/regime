import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { DaysService } from '../days.service';
import * as mainActions from './main.actions';
import { mergeMap, map, filter } from 'rxjs/operators';
import { RationDay } from 'src/app/dtos/ration-day';

@Injectable()
export class MainEffects {
    constructor(private actions$: Actions,
                private daysService: DaysService) { }
    @Effect()
    loadDays$ = this.actions$.pipe(
        ofType(mainActions.MainActionTypes.Load),
        mergeMap(
            (action: mainActions.Load) =>
                this.daysService.getDays().pipe(
                    map((days: RationDay[]) => (new mainActions.LoadSuccess(days)))
                ))
    );
}
