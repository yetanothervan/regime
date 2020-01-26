import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Dish } from 'src/app/dtos/dish';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as root from 'src/app/root-store';
import * as me from './../../state';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import { DishExt } from 'src/app/models/dish-ext';

@Component({
  selector: 'rg-dishes-provider',
  templateUrl: './dishes-provider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishesProviderComponent implements OnInit {

  filteredAndSortedDishes$: Observable<DishExt[]>;
  sorting$: BehaviorSubject<Sort> = new BehaviorSubject({ active: 'caption', direction: 'asc' });
  filterString$: Observable<string>;

  constructor(private store: Store<me.DishesState>, private rootStore: Store<root.RootState>,
              private shared: SharedFuncService) {
    this.filterString$ = this.store.select(me.getFilterString);
    this.filteredAndSortedDishes$ = combineLatest(
      this.rootStore.select(root.getEntitiesDishes),
      this.rootStore.select(root.getEntitiesIngredients),
      this.filterString$,
      this.sorting$).pipe(
        map(([dishes, ings, filter, sort]) => {
          // filter
          const filtered = dishes.filter(item => item && item.caption && item.caption.toLowerCase().includes(filter.toLowerCase()));
          // sort
          if (sort.active && sort.direction) {
            shared.sortMatTable(filtered, sort.active, sort.direction === 'asc');
          }
          // detail
          return shared.detailDish(filtered, ings);
        })
      );
  }

  filterStringChanged(filterString: string) {
    this.store.dispatch(me.DishesActions.dishesSetFilter({filterString}));
  }

  sortingChanged(sorting: Sort) {
    this.sorting$.next(sorting);
  }

  ngOnInit() {
  }

}
