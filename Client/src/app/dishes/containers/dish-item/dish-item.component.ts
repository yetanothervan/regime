import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as me from '../../state';
import * as root from 'src/app/root-store';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import { Dish } from 'src/app/dtos/dish';
import { Ingredient } from 'src/app/dtos/ingredient';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rg-dish-item',
  templateUrl: './dish-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishItemComponent implements OnInit {

  dish$: Observable<Dish>;
  ingredients$: Observable<Ingredient[]>;

  constructor(private store: Store<me.DishState>,
              private route: ActivatedRoute,
              private shared: SharedFuncService,
              private router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(me.DishActions.dishPathEditNavigated({ id }));

    this.dish$ = this.store.pipe(
      select(me.getDishCurrentMutable)
    );

    this.ingredients$ = this.store.pipe(
      select(root.getEntitiesIngredients),
      map((ings) => {
        ings.sort((a: Ingredient, b: Ingredient) => {
          if (a.caption < b.caption) { return -1; }
          if (a.caption > b.caption) { return 1; }
          return 0;
        });
        return ings;
      })
    );
  }

  ngOnInit() {
  }

  onSaved(dish: Dish) {
    if (!this.shared.ifEmpty(dish.id)) { // update
      this.store.dispatch(me.DishActions.dishUpdate({ dish }));
      this.router.navigate(['../all'], { relativeTo: this.route });
    } else { // create
      this.store.dispatch(me.DishActions.dishCreate({ dish }));
      this.router.navigate(['../all'], { relativeTo: this.route });
    }
  }

}
