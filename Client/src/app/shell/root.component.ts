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
    store.dispatch(RootActions.dishesLoad());
    store.dispatch(RootActions.ingredientsLoad());
  }
}
