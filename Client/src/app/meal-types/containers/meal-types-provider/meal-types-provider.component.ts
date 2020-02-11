import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { MealType } from 'src/app/dtos/meal-type';
import { Store } from '@ngrx/store';
import * as root from 'src/app/root-store';

@Component({
  selector: 'rg-meal-types-provider',
  template: `<rg-meal-types-list [mealTypes]="mealTypes$ | async"></rg-meal-types-list>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealTypesProviderComponent implements OnInit {

  mealTypes$: Observable<MealType[]>;

  constructor(private store: Store<root.RootState>) {
    this.mealTypes$ = this.store.select(root.getEntitiesMealTypes);
    this.mealTypes$.subscribe((m) => console.log(m));
  }

  ngOnInit(): void {
  }

}
