import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/dtos/ingredient';
import * as me from '../../state';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';

@Component({
  selector: 'rg-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientItemComponent implements OnInit, OnDestroy {

  ingredient$: Observable<Ingredient>;

  constructor(private store: Store<me.IngredientsState>,
              private route: ActivatedRoute,
              private shared: SharedFuncService,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(me.IngActions.ingredientsPathEditNavigated({id}));
    this.ingredient$ = this.store.pipe(select(me.getIngredientCurrent));
  }

  onSaved(ingredient: Ingredient) {
    if (!this.shared.ifEmpty(ingredient.id)) { // update
      this.store.dispatch(me.IngActions.ingredientsUpdate({ingredient}));
      this.router.navigate(['../all'], {relativeTo: this.route});
    } else { // create
      this.store.dispatch(me.IngActions.ingredientsCreate({ingredient}));
      this.router.navigate(['../all'], {relativeTo: this.route});
    }
  }

  ngOnDestroy() {
  }

}
