import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState, RootActions } from '../root-store';

@Component({
  selector: 'rg-root',
  templateUrl: './root.component.html'
})
export class RootComponent {
  title = 'Regime';

  constructor(private store: Store<RootState>) {
    store.dispatch(RootActions.dishLoad());
    store.dispatch(RootActions.ingredientsLoad());
    store.dispatch(RootActions.mealTypesLoad());
  }
}
