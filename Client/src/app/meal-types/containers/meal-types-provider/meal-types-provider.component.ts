import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { MealType } from 'src/app/dtos/meal-type';
import { Store } from '@ngrx/store';
import * as root from 'src/app/root-store';
import * as me from './../../state';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';

@Component({
  selector: 'rg-meal-types-provider',
  template: `<rg-meal-types-list
    [mealTypes]="mealTypes$ | async"
    (saved)="onSaved($event)"></rg-meal-types-list>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealTypesProviderComponent implements OnInit {

  mealTypes$: Observable<MealType[]>;

  constructor(private store: Store<root.RootState>, private shared: SharedFuncService) {
    this.mealTypes$ = this.store.select(root.getEntitiesMealTypes);
  }

  ngOnInit(): void {
  }

  onSaved(mealType: MealType) {
    if (!this.shared.ifEmpty(mealType.id)) { // update
      this.store.dispatch(me.MealTypesActions.mealTypeUpdate({ mealType }));
    } else { // create
      this.store.dispatch(me.MealTypesActions.mealTypeCreate({ mealType }));
    }
  }

  onDeleted(id: string) {
    if (!this.shared.ifEmpty(id)) {
      this.store.dispatch(me.MealTypesActions.mealTypeDelete({id}));
    }
  }

}
