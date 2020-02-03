import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable, combineLatest } from 'rxjs';
import * as me from '../../state';
import * as root from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Dish } from 'src/app/dtos/dish';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';

@Component({
  selector: 'rg-dish-provider',
  templateUrl: './dish-provider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishProviderComponent implements OnInit {

  filteredAndSortedDish$: Observable<Dish[]>;
  sorting$: Observable<Sort>;
  filterString$: Observable<string>;

  constructor(private store: Store<root.RootState>, private shared: SharedFuncService) {
    this.filterString$ = this.store.select(me.getFilterString);
    this.sorting$ = this.store.select(me.getSorting);

    this.filteredAndSortedDish$ = combineLatest(
      this.store.select(root.getEntitiesDishes),
      this.store.select(root.getEntitiesIngredients),
      this.filterString$,
      this.sorting$).pipe(
        map(([dishes, ings, filter, sort]) => {
          // filter
          const filtered = dishes.filter(item => item && item.caption && item.caption.toLowerCase().includes(filter.toLowerCase()));
          // detail
          const detailed = shared.detailDish(filtered, ings);
          // sort
          if (sort.active && sort.direction) {
            shared.sortMatTable(detailed, sort.active, sort.direction === 'asc');
          }
          return detailed;
        })
      );
  }

  filterStringChanged(filterString: string) {
    this.store.dispatch(me.DishActions.dishSetFilter({filterString}));
  }

  sortingChanged(sorting: Sort) {
    this.store.dispatch(me.DishActions.dishSetSorting({sorting}));
  }

  ngOnInit() {
    this.store.dispatch(me.DishActions.dishPathAllNavigated());
  }

}
