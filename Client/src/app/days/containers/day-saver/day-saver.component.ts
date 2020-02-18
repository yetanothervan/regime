import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as root from 'src/app/root-store';
import * as me from '../../state';
import { CurrentDayService } from '../../service/current-day.service';
import { take } from 'rxjs/operators';
import { DayModel } from 'src/app/models/day.model';

@Component({
  selector: 'rg-day-saver',
  template: `
  <div class="row no-gutters m-2">
    <div class="col-auto">
      <button class="btn btn-primary" (click)="onSave()">Save</button>
    </div>
    <div class="col-auto ml-3">
      <button class="btn btn-secondary" (click)="onReset()">Reset</button>
    </div>
</div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaySaverComponent implements OnInit {

  constructor(private store: Store<root.RootState>, private currentDayService: CurrentDayService) {
  }

  ngOnInit(): void {
  }

  onSave() {
    const day = this.currentDayService?.currentDay$?.value;
    if (day) {
      this.store.dispatch(me.DaysActions.dayUpdate({ day: day.getDto() }));
    }
  }

  onReset() {
    const id = this.currentDayService?.currentDay$?.value?.id;
    this.store.pipe(select(root.getRationDayById(id)), take(1))
      .subscribe(day => {
        const oldDay = new DayModel(day, this.store);
        this.currentDayService.currentDay$.next(oldDay);
      });
  }

}
