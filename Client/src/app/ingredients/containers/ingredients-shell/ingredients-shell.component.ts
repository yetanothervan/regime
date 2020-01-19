import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngredientsState } from '../../state/ingredients.reducer';
import * as ingActions from '../../state/ingredients.actions';

@Component({
  selector: 'rg-ingredients-shell',
  templateUrl: './ingredients-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientsShellComponent implements OnInit {

  constructor(private store: Store<IngredientsState>) { }

  ngOnInit() {
    this.store.dispatch(new ingActions.Load());
  }

}
