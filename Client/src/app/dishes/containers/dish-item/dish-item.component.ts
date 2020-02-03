import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as me from '../../state';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import { Dish } from 'src/app/dtos/dish';

@Component({
  selector: 'rg-dish-item',
  templateUrl: './dish-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishItemComponent implements OnInit, OnDestroy {

  dish$: Observable<Dish>;

  constructor(private store: Store<me.DishState>,
              private route: ActivatedRoute,
              private shared: SharedFuncService,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(me.DishActions.dishPathEditNavigated({id}));
    this.dish$ = this.store.pipe(select(me.getDishCurrent));
  }

  onSaved(dish: Dish) {
    if (!this.shared.ifEmpty(dish.id)) { // update
      this.store.dispatch(me.DishActions.dishUpdate({dish}));
      this.router.navigate(['../all'], {relativeTo: this.route});
    } else { // create
      this.store.dispatch(me.DishActions.dishCreate({dish}));
      this.router.navigate(['../all'], {relativeTo: this.route});
    }
  }

  onChanged(dish: Dish) {
    this.store.dispatch(me.DishActions.dishSetCurrentEditing({dish}));
  }

  ngOnDestroy() {
  }

}
