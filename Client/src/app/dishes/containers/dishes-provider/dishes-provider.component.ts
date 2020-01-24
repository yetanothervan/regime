import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Dish } from 'src/app/dtos/dish';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as root from 'src/app/root-store';
import * as dishes from './../../state';

@Component({
  selector: 'rg-dishes-provider',
  templateUrl: './dishes-provider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishesProviderComponent implements OnInit {

  filteredAndSortedDishes$: Observable<Dish[]>;
  sorting$: BehaviorSubject<Sort> = new BehaviorSubject({ active: 'caption', direction: 'asc' });
  filterString$: Observable<string>;

  constructor(private store: Store<dishes.DishesState>, private rootStore: Store<root.RootState>) {
    this.filterString$ = this.store.select(dishes.getFilterString);
    this.filteredAndSortedDishes$ = combineLatest(
      this.rootStore.select(root.getEntitiesDishes),
      this.filterString$,
      this.sorting$).pipe(
        map(([ings, filter, sort]) => {
          const filtered = ings.filter(item => item && item.caption && item.caption.toLowerCase().includes(filter.toLowerCase()));
          if (!sort.active || !sort.direction) { return filtered; }
          filtered.sort((a, b) => {
            const keyA = a[sort.active];
            const keyB = b[sort.active];
            if (sort.direction === 'asc') {
              if (keyA < keyB) { return -1; }
              if (keyA > keyB) { return 1; }
              return 0;
            } else {
              if (keyA > keyB) { return -1; }
              if (keyA < keyB) { return 1; }
              return 0;
            }
          });
          return filtered;
        })
      );
  }

  filterStringChanged(filterString: string) {
    this.store.dispatch(dishes.DishesActions.dishesSetFilter({filterString}));
  }

  sortingChanged(sorting: Sort) {
    this.sorting$.next(sorting);
  }

  ngOnInit() {
  }

}
