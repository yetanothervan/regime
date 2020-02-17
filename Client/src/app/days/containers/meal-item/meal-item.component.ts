import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as me from '../../state';
import * as root from 'src/app/root-store';
import { Meal } from 'src/app/dtos/meal';
import { Observable, combineLatest, pipe, of } from 'rxjs';
import { Dish } from 'src/app/dtos/dish';
import { Store, select } from '@ngrx/store';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { Ingredient } from 'src/app/dtos/ingredient';
import { DayModel } from 'src/app/models/day.model';
import { MealModel } from 'src/app/models/meal.model';

@Component({
  selector: 'rg-meal-item',
  template: `<rg-meal-form
  [meal]="meal$ | async"
  [dishes]="dishes$ | async"
  [ingredients]="ingredients$ | async"
  [mealModel]="mealModel$ | async"
  (changed)="onChanged()">
</rg-meal-form>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealItemComponent implements OnInit {

  meal$: Observable<Meal>;
  dishes$: Observable<Dish[]>;
  ingredients$: Observable<Ingredient[]>;
  mealId: string;
  mealModel$: Observable<MealModel>;

  constructor(private store: Store<me.DaysState>) {

    this.meal$ = combineLatest([
      this.store.select(me.getRationDayCurrentMutable),
      this.store.select(me.getCurrentMealId)
    ]).pipe(
      map(([day, mealId]) => {
        this.mealId = mealId;
        if (day && day.meals) {
          return day.meals.find(m => m.id === mealId)
        } else return null;
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

    this.ingredients$ = this.store.select(root.getEntitiesIngredients);

    this.mealModel$ = this.store.pipe(
      select(me.getMealCurrentModel),
      mergeAll()
    );
  }

  onChanged() {
    this.store.dispatch(me.DaysActions.mealMutableMutated({mealId: this.mealId }));
  }

  ngOnInit() {
  }

}
