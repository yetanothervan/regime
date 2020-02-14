import * as me from '.';
import * as root from 'src/app/root-store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DaysService } from 'src/app/days/service/days.service';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { RationDay } from 'src/app/dtos/ration-day';
import { Store, select } from '@ngrx/store';

@Injectable()
export class DaysEffects {
    constructor(private actions$: Actions,
                private daysService: DaysService,
                private store: Store<root.RootState>) { }

    updateRationDay$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.DaysActions.dayUpdate),
            mergeMap(
                (action) =>
                    this.daysService.updateRationDay(action.day).pipe(
                        map((day: RationDay) =>
                            (root.RootActions.dayUpdateSuccess({ day })))
                        // catchError(err => ) // TODO
                    )
            )));

    createRationDay$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.DaysActions.dayCreate),
            mergeMap(
                (action) =>
                    this.daysService.createRationDay(action.day).pipe(
                        map((day: RationDay) =>
                            (root.RootActions.dayCreateSuccess({ day })))
                        // catchError(err => ) // TODO
                    )
            )));

    deleteRationDay$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.DaysActions.dayDelete),
            mergeMap(
                (action) =>
                    this.daysService.deleteRationDay(action.id).pipe(
                        map((id: string) =>
                            (root.RootActions.dayDeleteSuccess({ id }))),
                        catchError(err =>
                            (of(me.DaysActions.dayDeleteFailed({ status: err.error }))))
                    )
            )));

    setForEditing$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.DaysActions.daySelected),
            withLatestFrom(this.store.pipe(select(me.getRationDayCurrentMutable))),
            mergeMap(
                ([action, current]) => {
                    if (!current || action.id !== current.id) {
                        return this.store.pipe(
                            select(root.getRationDayById(action.id)),
                            map(day =>
                                me.DaysActions.daysSetCurrentEditing({day})
                            )
                        );
                    }
                    return of(me.DaysActions.daysEmptyAction());
                }
            )
        ));
}