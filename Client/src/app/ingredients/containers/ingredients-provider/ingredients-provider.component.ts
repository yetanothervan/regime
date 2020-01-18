import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { Ingredient } from 'src/app/dtos/ingredient';
import * as fromIng from '../../state/ingredients.reducer';
import * as ingActions from '../../state/ingredients.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rg-ingredients-provider',
  templateUrl: './ingredients-provider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientsProviderComponent implements OnInit {

  filteredAndSortedIngredients$: Observable<Ingredient[]>;
  sorting$: BehaviorSubject<Sort> = new BehaviorSubject({active: 'caption', direction: 'asc'});
  filterString$: Observable<string>;

  constructor(private store: Store<fromIng.IngredientsState>) {
    this.filterString$ = this.store.select(fromIng.getFilterString);
    this.filteredAndSortedIngredients$ = combineLatest(
      this.store.select(fromIng.getIngredients),
      this.filterString$,
      this.sorting$).pipe(
        map(([ings, filter, sort]) => {
          return ings.filter(item => item && item.caption && item.caption.toLowerCase().includes(filter.toLowerCase()));
        })
      );
    this.store.dispatch(new ingActions.Load());
  }

  filterStringChanged(str: string) {
    this.store.dispatch(new ingActions.SetFilter(str));
  }

  sortingChanged(sorting: Sort) {
    this.sorting$.next(sorting);
  }

  ngOnInit() {
  }

}
