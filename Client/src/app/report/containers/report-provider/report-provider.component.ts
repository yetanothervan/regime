import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store';
import * as root from 'src/app/root-store';
import { combineLatest, Observable } from 'rxjs';
import { map, min } from 'rxjs/operators';
import { ReportItem } from '../../models/report-item';
import { RationDay } from 'src/app/dtos/ration-day';
import { Ingredient } from 'src/app/dtos/ingredient';
import { Dish } from 'src/app/dtos/dish';
import { ReportDay } from '../../models/report-day';

@Component({
  selector: 'rg-report-provider',
  template: `<rg-report-ingredients-list
    [reportDays]="reportDays$ | async"
  ></rg-report-ingredients-list>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportProviderComponent implements OnInit {

  reportDays$: Observable<ReportDay[]>;

  constructor(private store: Store<RootState>) {
    this.reportDays$ = combineLatest([
      this.store.select(root.getEntitiesDays),
      this.store.select(root.getEntitiesDishes),
      this.store.select(root.getEntitiesIngredients)
    ]).pipe(
      map(([days, dishes, ingredients])=>{
        const reportDays: ReportDay[] = [];
        if (!days || days?.length === 0) return reportDays;
        days.forEach(day => {
          const reportDay = this.getDayReport(day, dishes, ingredients);
          reportDays.push(reportDay);
        });
        const total = this.getReportTotal(reportDays);
        reportDays.push(total);
        return reportDays;
      })
    )
  }

  ngOnInit(): void {
  }

  getReportTotal(reportDays: ReportDay[]): ReportDay {
    const result = new ReportDay();
    result.caption = 'Total';
    reportDays.forEach(day => {
      day.items.forEach(item => {
        let exist = result.items.find(i => i.id === item.id);
        if (!exist) {
          exist = new ReportItem(item.id, item.caption, 0);
          result.items.push(exist);
        }
        exist.weight += item.weight;
      });
    });
    return result;
  }

  getDayReport(day: RationDay, dishes: Dish[], ingredients: Ingredient[]): ReportDay {
    const result = new ReportDay();
    if (!day?.meals) return result;

    result.caption = day.caption;

    day.meals.forEach(meal => {
      if (!meal?.mealItems) return;
      meal.mealItems.forEach(mi => {
        const dish = dishes.find(d => d.id === mi.dishId);
        if (!dish?.items) return;
        dish.items.forEach(di => {
          const ingredient = ingredients.find(i => i.id === di.ingredientId);
          let reportItem = result.items.find(ri => ri.id === ingredient.id);

          // create if not exist
          if (!reportItem) {
            reportItem = new ReportItem(ingredient.id, ingredient.caption, 0);
            result.items.push(reportItem);
          }

          const weight = di.weight * mi.weight;
          reportItem.weight += weight;
        });
      });
    });

    return result;
  }

}
