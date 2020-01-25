import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MainState } from '../../state/main.reducer';
import * as daysActions from '../../state/main.actions';
import * as fromMain from '../../state/main.reducer';
import { takeWhile } from 'rxjs/operators';
import { RationDay } from 'src/app/dtos/ration-day';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'rg-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainShellComponent implements OnInit, OnDestroy {

  componentIsActive = true;
  days$: Observable<RationDay[]>;
  dayId: string;

  constructor(private store: Store<MainState>) { }

  ngOnInit() {
    /* this.store.pipe(
      select(fromMain.getDays),
      takeWhile(() => this.componentIsActive))
        .subscribe((days: RationDay[]) => this.days = days);
    */
    this.days$ = this.store.pipe(select(fromMain.getDays));
    this.store.pipe(
      select(fromMain.getSelectedDayId),
      takeWhile(() => this.componentIsActive))
        .subscribe((day: string) => this.dayId = day);

    this.store.dispatch(new daysActions.Load());
  }

  ngOnDestroy(): void {
    this.componentIsActive = false;
  }

  selectDay(dayId: string): void {
    // this.store.dispatch(new daysActions.DaySelected(dayId));
  }
}
