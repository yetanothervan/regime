import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { RationDay } from 'src/app/dtos/ration-day';
import { Store, select } from '@ngrx/store';
import * as root from 'src/app/root-store';
import * as me from './../../state';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import { RationDayExt } from 'src/app/models/day-ext';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rg-days-provider',
  template: `<rg-days-list
    [days]="days$ | async"
    [selectedDayId]="currentDayId$ | async"
    (added)="onAdded()"
    (deleted)="onDeleted($event)"
    (selected)="onSelected($event)"></rg-days-list>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysProviderComponent implements OnInit {

  days$: Observable<RationDayExt[]>;
  currentDayId$: Observable<string>;

  constructor(private store: Store<root.RootState>, private shared: SharedFuncService) {
    this.days$ = combineLatest([
      this.store.select(root.getEntitiesDays),
      this.store.select(root.getEntitiesDishes),
      this.store.select(root.getEntitiesIngredients),
      this.store.select(root.getEntitiesMealTypes)
      ]).pipe(
        map(([days, dishes, ingredients, mealTypes]) => {
          const daysExt: RationDayExt[] = [];
          days.forEach(day => {
            const dayExt = new RationDayExt(day, ingredients, dishes, mealTypes);
            daysExt.push(dayExt);
          });
          return daysExt;
        })
      );
    this.currentDayId$ = this.store.select(me.getCurrentDayId);
  }

  ngOnInit(): void {
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
    this.store.dispatch(me.DaysActions.daySelected({ id }));
  }
}
