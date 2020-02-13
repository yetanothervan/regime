import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { RationDay } from 'src/app/dtos/ration-day';
import { Store } from '@ngrx/store';
import * as root from 'src/app/root-store';
import * as me from './../../state';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';

@Component({
  selector: 'rg-days-provider',
  template: `<rg-days-list
    [days]="days$ | async"
    [selectedDayId]="currentDayId$ | async"
    (saved)="onSaved($event)"
    (added)="onAdded()"
    (deleted)="onDeleted($event)"
    (selected)="onSelected($event)"></rg-days-list>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysProviderComponent implements OnInit {

  days$: Observable<RationDay[]>;
  currentDayId$: Observable<string>;

  constructor(private store: Store<root.RootState>, private shared: SharedFuncService) {
    this.days$ = this.store.select(root.getEntitiesDays);
    this.currentDayId$ = this.store.select(me.getCurrentDayId);
  }

  ngOnInit(): void {
  }

  onSaved(day: RationDay) {
    if (!this.shared.ifEmpty(day.id)) { // update
      this.store.dispatch(me.DaysActions.dayUpdate({ day }));
    } else { // create
      this.store.dispatch(me.DaysActions.dayCreate({ day }));
    }
  }

  onDeleted(id: string) {
    if (!this.shared.ifEmpty(id)) {
      this.store.dispatch(me.DaysActions.dayDelete({ id }));
    }
  }

  onAdded() {
    const day = new RationDay();
    this.store.dispatch(me.DaysActions.dayCreate({ day }))
  }

  onSelected(id: string) {
    this.store.dispatch(me.DaysActions.daySelected({id}));
  }
}
