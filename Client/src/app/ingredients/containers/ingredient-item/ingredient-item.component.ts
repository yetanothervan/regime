import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/dtos/ingredient';
import * as me from '../../state';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'rg-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientItemComponent implements OnInit, OnDestroy {

  ingredient$: Observable<Ingredient>;
  deleteStatus$: Observable<string>;

  componentIsActive = true;

  constructor(private store: Store<me.IngredientsState>,
              private route: ActivatedRoute,
              private shared: SharedFuncService,
              private router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(me.IngActions.ingredientsPathEditNavigated({ id }));
    this.ingredient$ = this.store.pipe(select(me.getIngredientCurrentMutable));
    this.deleteStatus$ = this.store.pipe(select(me.getIngredientDeleteStatus));
    combineLatest(this.deleteStatus$,
      this.ingredient$)
      .pipe(takeWhile(() => this.componentIsActive))
      .subscribe(([status, ing]) => {
        if (ing && !shared.ifEmpty(ing.id)
        && ing.id === status) {
          this.router.navigate(['../all'], { relativeTo: this.route });
        }
      });
  }

  ngOnDestroy(): void {
    this.componentIsActive = false;
  }

  ngOnInit() {
  }

  onSaved(ingredient: Ingredient) {
    if (!this.shared.ifEmpty(ingredient.id)) { // update
      this.store.dispatch(me.IngActions.ingredientsUpdate({ ingredient }));
      this.router.navigate(['../all'], { relativeTo: this.route });
    } else { // create
      this.store.dispatch(me.IngActions.ingredientsCreate({ ingredient }));
      this.router.navigate(['../all'], { relativeTo: this.route });
    }
  }

  onDeleted(id: string) {
    if (!this.shared.ifEmpty(id)) {
      this.store.dispatch(me.IngActions.ingredientsDelete({id}));
    }
  }

}
