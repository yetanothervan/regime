import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as me from '../../state';
import * as root from 'src/app/root-store';
import { Observable } from 'rxjs';
import { MealType } from 'src/app/dtos/meal-type';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import { MealExt } from 'src/app/models/meal-ext';
import { DayModel } from 'src/app/models/day.model';
import { CurrentDayService } from '../../service/current-day.service';

@Component({
  selector: 'rg-days-item',
  template: `<rg-ration-day-form
    [dayModel]="dayModel$ | async"
    [mealTypes$]="mealTypes$"
    [selectedMealId]="currentMealId$ | async"
    (mealSelected)="onMealSelected($event)">
  </rg-ration-day-form>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysItemComponent implements OnInit {

  dayModel$: Observable<DayModel>;
  currentMealId$: Observable<string>;
  mealTypes$: Observable<MealType[]>;
  mealMutated$: Observable<MealExt>;

  constructor(private store: Store<me.DaysState>,
    currentDayService: CurrentDayService) {

    this.dayModel$ = currentDayService.currentDay$.asObservable();

    this.mealTypes$ = this.store.pipe(
      select(root.getEntitiesMealTypes),
      map((mealTypes) => {
        mealTypes.sort((a: MealType, b: MealType) => {
          if (a.caption < b.caption) { return -1; }
          if (a.caption > b.caption) { return 1; }
          return 0;
        });
        return mealTypes;
      })
    );

    this.currentMealId$ = this.store.select(me.getCurrentMealId);
  }

  ngOnInit() {
  }

  onMealSelected(id: string) {
    this.store.dispatch(me.DaysActions.mealSelected({ id }));
  }

}
