import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { TemplatePfixService } from '../template.service';
import { mergeMap, map,  withLatestFrom } from 'rxjs/operators';
import * as me from '.';
import * as root from 'src/app/root-store';
import { RootActions } from 'src/app/root-store';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { TemplateDto } from 'src/app/dtos/tmp-dto';

// TemplatePfix
// templatePfix
// templateParam

@Injectable()
export class TemplatePfixEffects {
    constructor(private actions$: Actions,
                private templatePfixService: TemplatePfixService,
                private store: Store<root.RootState>) { }

    updateTemplatePfix$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.TemplateActions.templatePfixUpdate),
            mergeMap(
                (action) =>
                    this.templatePfixService.updateTemplatePfix(action.templateParam).pipe(
                        map((templateParam: TemplateDto) =>
                            (RootActions.templatePfixUpdateSuccess({ templateParam })))
                        // catchError(err => ) // TODO
                    )
            )));

    createTemplatePfix$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.TemplateActions.templatePfixCreate),
            mergeMap(
                (action) =>
                    this.templatePfixService.createTemplatePfix(action.templateParam).pipe(
                        map((templateParam: TemplateDto) =>
                            (RootActions.templatePfixCreateSuccess({ templateParam })))
                        // catchError(err => ) // TODO
                    )
            )));

    startEditing$ = createEffect(() =>
        this.actions$.pipe(
            ofType(me.TemplateActions.templatePfixPathEditNavigated),
            withLatestFrom(this.store.pipe(select(me.getTemplatePfixCurrent))),
            mergeMap(
                ([action, current]) => {
                    if (action.id !== current.id) {
                        return this.store.pipe(
                            select(root.getTemplatePfixById(action.id)),
                            map(templateParam =>
                                me.TemplateActions.templatePfixSetCurrentEditing({templateParam})
                            )
                        );
                    }
                    return of(me.TemplateActions.templatePfixEmptyAction());
                }
            )
        ));
}

