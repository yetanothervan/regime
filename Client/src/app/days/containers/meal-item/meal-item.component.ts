import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as me from '../../state';
import * as root from 'src/app/root-store';
import { Observable, of } from 'rxjs';
import { Dish } from 'src/app/dtos/dish';
import { Store, select } from '@ngrx/store';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { MealModel } from 'src/app/models/meal.model';
import { CurrentDayService } from '../../service/current-day.service';

@Component({
  selector: 'rg-meal-item',
  template: `<rg-meal-form
  [dishes]="dishes$ | async"
  [mealModel]="mealModel$ | async">
</rg-meal-form>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealItemComponent implements OnInit {

  dishes$: Observable<Dish[]>;
  mealModel$: Observable<MealModel>;

  constructor(private store: Store<me.DaysState>, private currendDayService: CurrentDayService) {

    this.mealModel$ = this.store.pipe(
      select(me.getCurrentMealId),
      withLatestFrom(this.currendDayService.currentDay$),
      mergeMap(([mealId, day]) => {
        if (!day || !day.meals$) return of(null);
        return day.meals$.asObservable().pipe(
          map(meals => meals.find(m => m.id === mealId))
        )
      })
    );

    this.dishes$ = this.store.pipe(
      select(root.getEntitiesDishes),
      map((dishes) => {
        dishes.sort((a: Dish, b: Dish) => {
          if (a.caption < b.caption) { return -1; }
          if (a.caption > b.caption) { return 1; }
          return 0;
        });
        return dishes;
      })
    );
   
  }

  ngOnInit() {
  }

}
