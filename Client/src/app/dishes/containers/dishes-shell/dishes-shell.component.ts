import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as dishesActions from './../../state/dishes.actions';
import { DishesState } from '../../state/dishes.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'rg-dishes-shell',
  templateUrl: './dishes-shell.component.html',
  styleUrls: ['./dishes-shell.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishesShellComponent implements OnInit {

  constructor(private store: Store<DishesState>) { }

  ngOnInit() {
    this.store.dispatch(new dishesActions.Load());
  }

}
