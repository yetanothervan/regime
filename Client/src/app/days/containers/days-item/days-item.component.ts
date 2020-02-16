import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as me from '../../state';
import * as root from 'src/app/root-store';
import { Observable, combineLatest } from 'rxjs';
import { RationDay } from 'src/app/dtos/ration-day';
import { MealType } from 'src/app/dtos/meal-type';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, takeWhile } from 'rxjs/operators';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import { MealExt } from 'src/app/models/meal-ext';

@Component({
  selector: 'rg-days-item',
  template: `<rg-ration-day-form
    [dayMutable]="day$ | async"
    [mealMutated]="mealMutated$ | async"
    [mealTypes]="mealTypes$ | async"
    [deleteStatus]="deleteStatus$ | async"
    (saved)="onSaved($event)"
    (deleted)="onDeleted($event)"
    [selectedMealId]="currentMealId$ | async"
    (mealSelected)="onMealSelected($event)">
  </rg-ration-day-form>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysItemComponent implements OnInit, OnDestroy {
  day$: Observable<RationDay>;
  currentMealId$: Observable<string>;
  mealTypes$: Observable<MealType[]>;
  deleteStatus$: Observable<string>;
  mealMutated$: Observable<MealExt>;

  componentIsActive = true;
  constructor(private route: ActivatedRoute, private store: Store<me.DaysState>,
    private router: Router, private shared: SharedFuncService) {

    this.day$ = this.store.pipe(
      select(me.getRationDayCurrentMutable)
    );

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

    this.mealMutated$ =
      combineLatest([
        this.store.select(me.getRationDayMealMutated),
        this.store.select(me.getRationDayCurrentMutable),
        this.store.select(root.getEntitiesDishes),
        this.store.select(root.getEntitiesIngredients),
        this.store.select(root.getEntitiesMealTypes),
      ]).pipe(
        map(([mealId, day, dishes, ingredients, mealTypes]) => {
          const meal = day.meals.find(m => m.id === mealId.mealId);
          return new MealExt(meal, ingredients, dishes, mealTypes);
        })
      );

    this.deleteStatus$ = this.store.pipe(
      select(me.getRationDayDeleteStatus)
    );

    combineLatest([this.deleteStatus$, this.day$])
      .pipe(takeWhile(() => this.componentIsActive))
      .subscribe(([status, day]) => {
        if (day && !shared.ifEmpty(day.id)
          && day.id === status) {
          this.router.navigate(['../' + me.allPath], { relativeTo: this.route });
        }
      });

    this.currentMealId$ = this.store.select(me.getCurrentMealId);
  }

  ngOnDestroy(): void {
    this.componentIsActive = false;
  }

  ngOnInit() {
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

  onMealSelected(id: string) {
    this.store.dispatch(me.DaysActions.mealSelected({ id }));
  }

}
